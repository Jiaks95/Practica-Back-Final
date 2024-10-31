// Creacion del objeto models que contiene, en este caso, el modelo de los comercios, para luego exportarlo
const models = {
    comerciosModel: require("./nosql/comerciosModel"),
    websModel: require("./nosql/websModel"),
    usersModel: require("./nosql/usersModel"),
};

module.exports = models;