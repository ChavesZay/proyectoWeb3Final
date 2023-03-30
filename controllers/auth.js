const { request, response } = require('express');
const Usuario = require('../models/users.js');
var bcrypt = require('bcryptjs');
const generarJWT =require('../helpers/generarJWT.js')


const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ email });
    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: "El email no es correcto",
            email
        })
    }
    const passwordValid=bcrypt.compareSync(password,user.password);
    if (!passwordValid) {
        return res.status(400).json({
            ok: false,
            msg: "El email o password no es correcto",
            password
        })
    }
    //Validar el JsonWebToken
    //await porque es una promise
    const token =await generarJWT(user.id);
    return res.status(200).json({
        ok: true,
        msg: "Estoy desde el login",
        email,
        password, 
        token
    })
}

module.exports = { login }