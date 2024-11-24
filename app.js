const express = require("express");
// Importamos la funcion para conectarnos a la base de datos
const dbConnect = require("./config/mongo")
// Importamos las configuraciones especificadas en el .env
require("dotenv").config();
const morganBody = require("morgan-body");
const loggerStream = require("./utils/loggerHandle");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");
const cors = require("cors");

// Definicion y creacion de la aplicacion
const app = express();

app.use(cors())
// Se le indica a la app que use el middleware json para parsear los json de las solicitudes a objetos JavaScript
app.use(express.json());

app.use(express.static("storage"))

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
);

// Se le indica a la app a usar el enrutador creado en ./routes/index.js
app.use("/api", require("./routes"));


morganBody(app, {
    noColors: true, //limpiamos el str de datos lo maximo posible antes de mandarlo a Slack
    skip: function(req, res) { // Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
});

// Definimos el puerto que vamos a usar, si este esta definido en el .env, se usara, si no, se usara el puerto 3000 por defecto
const port = process.env.PORT || 3000;

// Abrimos y escuchamos el puerto y nos conectamos a la base de datos
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
    dbConnect()
});

module.exports = app;