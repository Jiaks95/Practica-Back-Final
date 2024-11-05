const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        email: {
            type: String,
            unique: true 
        },
        password: {
            type: String
        },
        edad: {
            type: Number
        },
        ciudad: {
            type: String
        },
        intereses: {
            type: [String]
        },
        permiteRecibirOfertas: {
            type: Boolean,
            default: false
        },
        rol: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    }
);

UserScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("users", UserScheme);