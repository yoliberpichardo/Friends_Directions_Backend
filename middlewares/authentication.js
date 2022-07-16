const jwt = require('jsonwebtoken');

//codificar password

const singInJWT = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign({id: user._id}, process.env.SECRET_KEY, (err, token) => {
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
        jwt.verify(bearerToken, process.env.SECRET_KEY, (err, payload) => {
            if(err){
                return res.status(403).json({
                    msg: 'no authorize'
                })
            }
            req.token = payload.id;
            next();
        })
        
    }else {
        return res.status(403).json({
            msg: 'no authorize'
        })
    }
   
}

module.exports = {
    verifyJWT,
    singInJWT
}