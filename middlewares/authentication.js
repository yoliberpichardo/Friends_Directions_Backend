const jwt = require('jsonwebtoken');

//codificar password

const singInJWT = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
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