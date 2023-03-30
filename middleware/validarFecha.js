const { request, response } = require("express");

//Valida que sea una fecha mayor o igual a la de hoy
const validarFecha = async (req = request, res = response, next) => {
    try {
        let{date}=req.body;
        let fechaActual = new Date();
        const fechaCita= date;
        fechaActual=new Date();
        fechaActual.setHours(00);
        if (new Date(fechaCita)< fechaActual) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha no es valida'
            })
        } 
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error en la fecha'
        })
    }
    next();
}

module.exports = { validarFecha }