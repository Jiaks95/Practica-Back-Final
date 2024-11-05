const { check, validationResult } = require("express-validator");
const validateResults = require("../utils/validatorHandle");

const validateRegister = [
    check("nombre").exists().notEmpty().isLength({min: 4, max: 99}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 8, max: 20}),
    check("edad").exists().notEmpty().isNumeric(),
    check("ciudad").exists().notEmpty(),
    check("intereses").exists().notEmpty().isArray(),
    check("permiteRecibirOfertas").optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validateLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 8, max: 20}),
    (req,res, next) => {
        return validateResults(req, res, next);
    }
];

const validateGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validateUpdateUser = [
    check("nombre").optional().exists().notEmpty().isLength({min: 4, max: 99}),
    check("email").optional().exists().notEmpty().isEmail(),
    check("password").optional().exists().notEmpty().isLength({min: 8, max: 20}),
    check("edad").optional().exists().notEmpty().isNumeric(),
    check("ciudad").optional().exists().notEmpty(),
    check("intereses").optional().exists().notEmpty().isArray(),
    check("permiteRecibirOfertas").optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validateRegister, validateLogin, validateGetItem };