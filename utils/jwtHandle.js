const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "1y"         
        }
    );
    return sign
};

const tokenComercio = (comercio) => {
    const sign = jwt.sign(
        {
            cif: comercio.CIF
        },
        JWT_SECRET,
        {
            expiresIn: "1y" 
        }
    );
    return sign;
};

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch(err) {
        console.log(err);
    }
};

module.exports = { tokenSign, tokenComercio, verifyToken }; 