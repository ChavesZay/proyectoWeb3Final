const { request,response } = require("express");
const jwt = require('jsonwebtoken');
const User=require('../models/users.js');
const Appointment=require('../models/appointment.js')

//Valida que sea un rol autorizado y que el rol public solo aplique una cita
const validarRolCita= async(req=request ,res=response,next)=>{
    const token=req.header('auth');
    try {
        const roles=['recepcionista','public','admin'];
        const payload=jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {id}=payload;
        req.user=id;
        const user = await User.findById(id);
        if(!roles.includes(user.role.toLowerCase())){
            return res.status(400).json({
                ok:false,
                msg:'No tienes permiso de acceso al modulo de citas',
                user
            })
        }
        else if(user.role.toLowerCase()=="public"){
            const cita = await Appointment.find({'user':user._id,'state':true});
            if(cita.length!=0){
                return res.status(400).json({
                    ok:false,
                    msg:'No tienes permiso de acceso al modulo de citas, ya has creado una cita',
                    user
                })
            }
            
        }
    } catch (error) {
       return res.status(400).json({
            ok:false,
            msg:'Error de rol'
        })
    }
    next();
}


module.exports={
    validarRolCita
}
