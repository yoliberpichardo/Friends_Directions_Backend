const User = require('../models/User');
const bcrypt = require('bcrypt')


const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.json({ msg1: 'Please enter all fields' });
    }

    if (password.length < 6) {
        return res.json({ msg2: 'Password must be at least 6 characters' });
    }

    const passwordHash = await bcrypt.hash(password, 8)
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    await user.save()

    return res.status(200).json({
        user
    })
}


const loginUser = async (req, res) => {
    const { email, password } = req.body
    let comparePassword = ''

    if (!email || !password) {
        return res.send({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.send({ msg1: "este correo es incorrecto"})
    } else {
        comparePassword = bcrypt.compareSync(password, user.password)
    }

    if (!comparePassword) {
        return res.send({ msg2: "contraseña incorrecta" })
    }

    const token = await singInJWT(user)

    res.status(200).json({
        token,
        user
    })
}

module.exports = {
    loginUser,
    register
}