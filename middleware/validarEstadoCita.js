const { request, response } = require("express");
const Appointment =require('../models/appointment.js')

const validarEstadoCita = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const cita = await Appointment.findById(id);
        
        if (cita.state==false) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta cita ya esta eliminada'
            })
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el estado de la cita'
        })
    }
    next();
}

module.exports={validarEstadoCita}