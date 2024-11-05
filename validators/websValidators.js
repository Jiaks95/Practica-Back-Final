const { check } = require("express-validator");
const validateResults = require("../utils/validatorHandle");

const validatorCreateWeb = [
    check("ciudad").exists().notEmpty(),
    check("actividad").exists().notEmpty(),
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists().notEmpty(),
    check("imagenes").exists().notEmpty().isArray(),
    check("reviews.scoring").exists().notEmpty().isFloat(),
    check("reviews.totalReviews").exists().notEmpty().isInt(),
    check("reviews.reviewBody").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetWeb = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorUploadTextToWeb = [
    check("textos").exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorPatchWeb = [
    check("ciudad").optional().exists().notEmpty(),
    check("actividad").optional().exists().notEmpty(),
    check("titulo").optional().exists().notEmpty(),
    check("resumen").optional().exists().notEmpty(),
    check("textos").optional().exists().notEmpty().isArray(),
    check("imagenes").optional().exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateWeb, validatorGetWeb, validatorUploadTextToWeb };