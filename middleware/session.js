const { verifyToken } = require("../utils/jwtHandle");
const { usersModel } = require("../models");
const { comerciosModel } = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send("NOT_TOKEN");
            return
        }
        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token);
        if (!dataToken._id) {
            res.status(401).send("ERROR_ID_TOKEN");
            return  
        }
        const user = await usersModel.findById(dataToken._id);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("NOT_SESSION");
    }
};

const comercioMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send("NOT_TOKEN");
            return
        }
        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token);
        if (!dataToken.cif) {
            res.status(401).send("ERROR_CIF_TOKEN");
            return  
        }
        const comercio = await comerciosModel.findOne({CIF: dataToken.cif});
        req.comercio = comercio;
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send("NOT_COMERCIO");
    }
}

module.exports = { authMiddleware, comercioMiddleware };