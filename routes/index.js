const express = require("express");
// Importacion del modulo fs para trabajar con el sistema de archivos
const fs = require("fs");
// Definicion de un nuevo enrutador para gestionar rutas
const router = express.Router()

// Funcion para conseguir el nombre de un archivo eliminando su extension
const removeExtension = (fileName) => {
    return fileName.split(".").shift();
};

// Se lee el contenido del directorio actual en el que esta ubicado este archivo y se filtran los archivos ubicados en este
// En este caso, el directorio contiene el archivo de la ruta de los comercios
fs.readdirSync(__dirname).filter((file) => {
    // Se obtiene el nombre del archivo en el directorio
    const name = removeExtension(file);
    // Se comprueba que el archivo no sea index.js
    if (name !== "index") {
        // Se carga el archivo de la ruta y se asigna
        router.use("/" + name, require("./" + name));
    }
});

module.exports = router;