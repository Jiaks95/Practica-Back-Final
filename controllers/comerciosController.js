const { query } = require("express");
const { comerciosModel } = require("../models");

// Funcion para conseguir todos los comercios
const getComercios = async (req, res) => {
  const comercios = await comerciosModel.find({});
  // Si esta la query de ordenar por cif, entonces se pasan los comercios ordenados ascendentemente por el cif
  if (req.query.ordenar === "cif") {
    res.send(comercios.sort((a, b) => a.CIF.localeCompare(b.CIF)));
  }
  // Si la query no esta presente, entonces se pasan los comercios como estan
  else {
    res.send({ comercios });
  }
};

// Funcion para obtener un unico comercio a partir de su cif
const getComercio = async (req, res) => {
    // En esta funcion y en la de actualizar y eliminar un comercio, se obtiene el cif del comercio de la solicitud
  const cif = req.params.cif;
  const comercio = await comerciosModel.findOne({ CIF: cif });
  // Si no se encuentra un comercio con ese cif, se avisa 
  if (!comercio) {
    res.status(404).end("Comercio no encontrado");
  } else {
    res.send({ comercio });
  }
};

// Funcion para crear un nuevo comercio en la base de datos
const createComercio = async (req, res) => {
    // Se obtiene la informacion del comercio a crear
  const { body } = req;
  const comercio = await comerciosModel.create(body);
  // Tras la creacion del comercio, se muestra su informacion
  res.send({ comercio });
};

// Funcion para actualizar la informacion de un comercio mediante su cif
const updateComercio = async (req, res) => {
    // Obtencion del cif del comercio a actualizar a partir de la solicitud
  const cif = req.params.cif;
  // Obtencion de la informacion actualizada del comercio
  const { body } = req;
  const comercioActualizado = await comerciosModel.findOneAndUpdate(
    { CIF: cif },
    body,
    { new: true }
  );
  // Si no hay un comercio con el cif especificado, se avisa
  if (!comercioActualizado) {
    res.status(404).end("El comercio a actualizar no existe");
  } else {
    res.send({ comercioActualizado });
  }
};

// Funcion para eliminar un comercio
const deleteComercio = async (req, res) => {
    // Obtencion del cif
  const cif = req.params.cif;
  // Se declara una variable que contendra el comercio eliminado
  let comercioEliminado;
  // Si en la solicitud se especifica, el borrado sera logico
  if (req.query.delete === "soft") {
    comercioEliminado = await comerciosModel.delete({ CIF: cif });
    // Si no, el borrado sera fisico
  } else {
    comercioEliminado = await comerciosModel.findOneAndDelete({ CIF: cif });
  }
  // Si se puedo eliminar el comercio, se avisa
  if (comercioEliminado) {
    res.send("Comercio eliminado.");
  // Si no se pudo, es decir, no habia un comercio con ese cif, se avisa
  } else {
    res.status(404).end("El comercio a eliminar no existe");
  }
};

module.exports = {
  getComercios,
  getComercio,
  createComercio,
  updateComercio,
  deleteComercio,
};
