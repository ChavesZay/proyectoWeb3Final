const { request, response } = require('express');
const Usuario = require('../models/users.js');
var bcrypt = require('bcryptjs');
const generarJWT =require('../helpers/generarJWT.js')



const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ email });
    const rol=user.role;
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
        token,
        rol
    })
}

const googleSingIn = async (req = request, res = response) => {
    const { id_token } = req.body;
  
    try {
      //Capturamos el usuario que esta solicitango logueo
      const googleUser = await googleVerify(id_token);
  
      //Tercer paso desestructurar y grabar en nuestra aplicacion
      //el usuario que se logueo en google
      const { name, email, picture } = googleUser;
  
      //Cuarto paso Generar la referencia para saber si el usuario ya existe
  
      let usuario = await Usuario.findOne({ email });
  
      if (!usuario) {
        const data = {
          name: name,
          email: email,
          //El hash se le delega a google
          password: "p",
          google: true,
          rol: "ADMIN",
        };
        usuario = new Usuario(data);
        await usuario.save();
      }
  
      //Generamos el JsonWebToken
      const token = await GenerarJWT(usuario.id);
  
      //Configuramos la salida
      res.status(200).json({
        msg: "Todo bien desde googleSignIn",
        /* 
          Esto va primero y tras hacer la validacion lo borramos para 
          solo devolver el usuario y el token 
           id_token,
           googleUser
          */
        usuario,
        token,
      });
  
      console.log("Creacion correcta del usuario en google");
    } catch (err) {
      console.log(err);
      res.status(400).json({
        ok: false,
        msg: "El token no se pudo verificar. Intentar con otro",
      });
    }
  };

module.exports = { login,
                   googleSingIn
}