const { websModel, comerciosModel } = require("../models");
const { findOneAndUpdate, findOne } = require("../models/nosql/comerciosModel");

const checkWebProperty = (req, res, next) => {
    try {
        const webComercioId = req.comercio.idPagina;
        if (!webComercioId) {
            res.status(404).send("No tiene una web.");
            return;
        }
        const id = req.params.id;
        if (!webComercioId.equals(id)) {
            res.status(403).send("AUTHORIZATION_ERROR");
            return;
        }
        next();
    } catch(err) {
       console.log(err);
       res.statur(500).send("CHECK_WEB_PROPERTY_ERROR") 
    }
};

function orderByScore(req, res, webs) {
    if (req.query.scoring === "true") {
        webs.sort((a, b) => b.reviews.scoring - a.reviews.scoring);
    }
    res.send(webs);
};

const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const getWebs = async (req, res) => {
    try {
        let ciudad = req.query.ciudad;
        let actividad = req.query.actividad;
        if (ciudad) ciudad = capitalizeFirstLetter(ciudad);
        if (actividad) actividad = capitalizeFirstLetter(actividad);
        let webs;
        if (!ciudad && !actividad) {
            webs = await websModel.find({});
        } else if (ciudad && !actividad) {
            webs = await websModel.find({ciudad: ciudad});
        } else if (actividad && !ciudad) {
            webs = await websModel.find({actividad: actividad});
        } else {
            webs = await websModel.find({ciudad: ciudad, actividad: actividad});
        }
        if (req.query.scoring === "true") {
            webs.sort((a, b) => b.reviews.scoring - a.reviews.scoring);
        }
        res.send(webs)
    } catch (err) {
        console.log(err);
        res.status(500).send("GET_WEBS_ERROR");
    }
};

const getWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const web = await websModel.findById(id);
        if (!web) {
            res.status(404).end(`No existe una web con el id ${id}.`);
            return;
        }
        res.send(web);
    } catch (err) {
        res.status(500).end("GET_WEB_ERROR");
    }
};

const createWeb = async (req, res) => {
    try {
        const comercio = req.comercio;
        if (comercio.idPagina) {
            res.status(409).send("Comercio ya tiene una web.");
            return;
        }
        const { body } = req;
        const web = await websModel.create(body);
        await comerciosModel.findByIdAndUpdate(comercio._id, {idPagina: web._id}, {new: true});
        res.send(web);
    } catch (err) {
        console.log(err);
        res.status(500).send("WEB_CREATION_ERROR");
    }
};

const updateWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const { body } = req;
        const webActualizada = await websModel.findOneAndUpdate({_id: id}, body, {new: true});
        if (!webActualizada) {
            res.status(404).send("La web a actualizar no existe.");
            return;
        }
        res.send(webActualizada);
    } catch (err) {
        console.log(err);
        res.status(500).send("UPDATE_WEB_ERROR");
    }
};

const patchWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const {body} = req;
        const web = await websModel.findOneAndUpdate({_id: id}, body, {new: true});
        res.send(web);
    } catch (err) {
        console.log(err);
        res.status(500).send("PATCH_WEB_ERROR")
    }
}

const uploadImageToWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const {body, file}  = req;
        const fileData = {
            filename: file.filename,
            url: process.env.PUBLIC_URL + "/" + file.filename
        }
        const webActualizada = await websModel.findOneAndUpdate({_id: id}, {$push: {imagenes: fileData.url}}, {new: true});
        if (!webActualizada) {
            res.status(404).send("La web a actualizar no existe.")
            return;
        }
        res.send(webActualizada);
    } catch (err) {
        console.log(err);
        res.status(500).send("UPLOAD_IMAGE_ERROR");
    }
};

const uploadTextToWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const { body } = req;
        const webActualizada = await websModel.findOneAndUpdate({_id: id}, { $push: { textos: { $each: body.textos } } }, {new: true});
        if (!webActualizada) {
            res.status(404).send("La web a actualizar no existe.");
            return;
        }
        res.send(webActualizada);
    } catch(err) {
        console.log(err);
        res.status(500).send("UPLOAD_TEXT_ERROR");
    }
};

const reviewWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const {body} = req;
        const score = body.score;
        const review = body.review;
        const webToBeReviewed = await websModel.findOne({_id: id});
        const scoring = 1;
    } catch (err) {
        console.log(err);
        res.status(500).send("REVIEW_WEB_ERROR");
    }
}

const deleteWeb = async (req, res) => {
    try {
        const id = req.params.id;
        let webEliminada;
        if (req.query.delete === "soft") {
            webEliminada = await websModel.delete({_id: id});
            if (!webEliminada) {
                res.status(404).send("La web a eliminar no se encontro");
                return;
            }
            res.send("La web ha sido eliminada de forma logica");
        } else {
            webEliminada = await websModel.deleteOne({_id: id});
            await comerciosModel.findByIdAndUpdate(comercio._id, {idPagina: null}, {new: true});
            if (webEliminada.deletedCount === 0) {
                res.status(404).send("La web a eliminar no se encontro");
                return;
            }
            res.send("La web ha sido eliminada de forma fisica");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("DELETE_WEB_ERROR");
    }
}

module.exports = { checkWebProperty, getWeb, createWeb, updateWeb, uploadImageToWeb, uploadTextToWeb, deleteWeb, getWebs, patchWeb };