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
                msg: 'La fecha no es valida, ingrese una fecha correcta'
            })
        } 
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg:  'Error en la fecha, verifque de enviar una fecha valida'
        })
    }
    next();
}

const validarFechaQuerry = async (req = request, res = response, next) => {
    try {
        let{date}=req.query;
        let fechaActual = new Date();
        const fecha= new Date(date);
        fechaActual=new Date();
        fechaActual.setHours(00);
        if (fecha< fechaActual) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha no es valida'
            })
        } else if (fecha.getDay() == 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Los domingos no se trabaja, agende la cita para otra fecha'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error en la fecha, verifque de enviar una fecha valida'
        })
    }
    next();
}

module.exports = { validarFecha, 
                   validarFechaQuerry }