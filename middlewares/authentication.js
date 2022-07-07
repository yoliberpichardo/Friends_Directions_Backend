const jwt = require('jsonwebtoken');

//codificar password

const singInJWT = (req, res) => {
    jwt.sign({password: req.body.password}, 'secretKey', (err, token) => {
        try {
            res.status(200).json({
                token
            })
        } catch {
            res.status(500).error(err)
        }
    })
}


// verificar si el password es correcto
const verifyJWT = (req, res, next) =>{
    //Authorization: Bearer <token>
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken;
        next();
    }else {
        res.senStatus(403)
    }
   
}

module.exports = {
    verifyJWT,
    singInJWT
}