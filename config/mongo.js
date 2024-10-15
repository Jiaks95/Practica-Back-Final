const mongoose = require("mongoose");
// Funcion para conectarse a la base de datos
const dbConnect = () => {
    // Primero se obtiene la uri para la conexion a la base de datos del .env
    const db_uri = process.env.DB_URI;
    // Se configura mongoose para permitir consultas menos estrictas
    mongoose.set("strictQuery", false);
    // Se intenta conectar a la base de datos
    try {
        mongoose.connect(db_uri);
    }
    // Mostrar error en caso de no lograr la conexion
    catch(error) {
        console.err("Error conectando a la DB:", error);
    }
    // Si se logra conectar a la base de datos, se muestra un mensaje avisando de la conexion exitosa
    mongoose.connection.on("connected", () => console.log("Conectado a la DB"))
};

module.exports = dbConnect