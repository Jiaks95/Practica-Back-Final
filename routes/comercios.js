const express = require("express");
const router = express.Router();
// Importacion de los controladores usados para la obtencion, creacion, actualizacion y eliminacion de comercios
const {getComercios, getComercio, createComercio, updateComercio, deleteComercio} = require("../controllers/comerciosController");

// Definimos las rutas del enrutador para los metodos HTTP que correspondan y la funcion que se debe de ejecutar en cada caso

// Para conseguir todos los comercios, permite tambien obtenerlos ordenados ascendentemente por el cif
router.get("/", getComercios);
// Para conseguir un comercio mediante su cif
router.get("/:cif", getComercio);
// Para crear un comercio nuevo en la base de datos
router.post("/", createComercio);
// Para actualizar un comercio mediante su cif
router.put("/:cif", updateComercio);
// Para eliminar un comercio mediante su cif, permite tambien un borrado logico
router.delete("/:cif", deleteComercio);

module.exports = router;