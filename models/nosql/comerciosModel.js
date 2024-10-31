const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
// Creacion y definicion del modelo de los comercios con mongoose
const comercioScheme = new mongoose.Schema(
    {
        nombreComercio: {
            type: String
        },
        CIF: {
            type: String
        },
        direccion: {
            type: String
        },
        email: {
            type: String
        },
        telefonoDeContacto: {
            type: String
        },
        idPagina: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }
);

// Permitimos el borrado logico de los comercios
comercioScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("comercios", comercioScheme);