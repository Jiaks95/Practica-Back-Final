const { check } = require("express-validator");
const validateResults = require("../utils/validatorHandle");

const validatorCreateComercio = [
    check("nombreComercio").exists().notEmpty(),
    check("CIF").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefonoDeContacto").exists().notEmpty(),
    check("idPagina").optional().exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetComercio = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorCreateComercio, validatorGetComercio };