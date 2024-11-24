const { encrypt, compare } = require("../utils/passwordHandle");
const { usersModel, websModel } = require("../models");
const { tokenSign } = require("../utils/jwtHandle");
const { matchedData } = require("express-validator");

const registerUser = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, {strict: false});
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        };
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("ERROR_REGISTER_USER")
    }
};

const loginUser = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email: req.email}).select("password nombre rol email");
        if (!user) {
            res.status(404).send("USER_NOT_EXISTS");
            return
        };
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);
        if (!check) {
            res.status(403).send("INCORRECT_PASSWORD");
            return
        };
        user.set("password", undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        };
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("ERROR_LOGIN");
    }
};

// const updateUser = async (req, res) => {
//     try {
//         const session_id = req.user._id;
//         const user_id = req.params.id;
        
//         if (!session_id.equals(user_id)) {
//             res.status(403).send("AUTHORIZATION_ERROR");
//             return;
//         }

//         const { intereses: newIntereses, ...otherUpdates } = req.body;

  
//         const updateData = { ...otherUpdates };

//         if (newIntereses) {
//             updateData.$addToSet = { intereses: { $each: newIntereses } };
//         }

//         const updatedUser = await usersModel.findByIdAndUpdate(user_id, updateData, { new: true });
//         res.send(updatedUser);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("UPDATE_ERROR");
//     }
// };

const updateUser = async (req, res) => {
    try {
        const session_id = req.user._id;
        const user_id = req.params.id;

        if (!session_id.equals(user_id)) {
            return res.status(403).send({ error: "AUTHORIZATION_ERROR" });
        }

        const updateData = req.body;

        // Actualizar solo los campos presentes en req.body
        const updatedUser = await usersModel.findByIdAndUpdate(
            user_id,
            { $set: updateData },
            { new: true } // Devuelve el usuario actualizado
        );

        if (!updatedUser) {
            return res.status(404).send({ error: "USER_NOT_FOUND" });
        }

        res.send(updatedUser);
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(500).send({ error: "UPDATE_ERROR", details: err.message });
    }
};



const deleteUser = async (req, res) => {
    try {
        const session_id = req.user._id;
        const user_id = req.params.id;
        if (!session_id.equals(user_id)) {
            res.status(403).send("AUTHORIZATION_ERROR");
            return
        }
        const deletedUser = await usersModel.deleteOne({_id: user_id});
        res.send(deletedUser);
    } catch (err) {
        res.status(500).send("DELETE_ERROR");
    }
};

const getUsersEmails = async (req, res) => {
    try {
        const comercioWebId = req.comercio.idPagina;
        if (!comercioWebId) {
            res.status(404).send("No tiene una web.");
            return;
        }
        const comercio = await websModel.findOne({_id: comercioWebId})
        const usersEmails =  await usersModel.find({permiteRecibirOfertas: true, intereses: {$in: [comercio.actividad]}, ciudad: comercio.ciudad}).select("email");
        const interestedUsersEmails = usersEmails.map(user => user.email);
        res.send(interestedUsersEmails)
    } catch(err) {
        console.log(err);
        res.status(500).send("GET_USERS_EMAILS_ERROR");
    }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUsersEmails };