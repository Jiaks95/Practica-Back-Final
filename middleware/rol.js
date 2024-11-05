const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req;
        const userRol = user.rol;
        const checkValueRol = roles.includes(userRol);
        if (!checkValueRol) {
            res.status(403).send("NOT_ALLOWED");
            return;
        }
        next()
    } catch (err) {
        console.log(err);
        res.status(403).send("ERROR_PERMISSIONS");
    }
};

module.exports = checkRol;