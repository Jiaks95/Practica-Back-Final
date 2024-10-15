const express = require("express");
// Importamos la funcion para conectarnos a la base de datos
const dbConnect = require("./config/mongo")
// Importamos las configuraciones especificadas en el .env
require("dotenv").config();

// Definicion y creacion de la aplicacion
const app = express();

// Se le indica a la app que use el middleware json para parsear los json de las solicitudes a objetos JavaScript
app.use(express.json());

// Se le indica a la app a usar el enrutador creado en ./routes/index.js
app.use("/api", require("./routes"));

// Definimos el puerto que vamos a usar, si este esta definido en el .env, se usara, si no, se usara el puerto 3000 por defecto
const port = process.env.PORT || 3000;

// Abrimos y escuchamos el puerto y nos conectamos a la base de datos
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
    dbConnect()
});