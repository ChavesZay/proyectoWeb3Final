const { request,response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT= async(req=request ,res=response,next)=>{
    const token=req.header('auth');
    //si el token viene
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'El token no es valido'
        })
    }

    //Si el token es valido
    try {
        const payload=jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {id}=payload;
        //Cargar al request
        req.user=id;
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'El token no es valido'
        })
    }


    next();
}

module.exports={validarJWT}