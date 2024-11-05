const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const WebScheme = new mongoose.Schema(
    {
        ciudad: {
            type: String
        },
        actividad: {
            type: String
        },
        titulo: {
            type: String
        },
        resumen: {
            type: String
        },
        textos: {
            type: [String]
        },
        imagenes: {
            type: [String]
        },
        reviews: {
            scoring: {
                type: Number
            },
            totalReviews: {
                type: Number
            },
            reviewBody: {
                type: String
            }
        }
    }
);

WebScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("webs", WebScheme);