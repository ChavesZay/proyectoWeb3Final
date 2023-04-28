const { request, response } = require("express");
const Consult =require('../models/consults.js')
const User =require('../models/users.js')
const Patient =require('../models/patients.js')
const Appointment =require('../models/appointment.js')




const validarEstadoConsult = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const consulta = await Consult.findById(id);
        
        if (consulta && consulta.state==false) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta consulta ya esta eliminada'
            })
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el estado de la consulta'
        })
    }
    next();
}


const validarEstadoUser = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (user && user.state==false) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esta eliminado'
            })
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el estado del Usuario'
        })
    }
    next();
}
const validarEstadoPatient = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        
        if (patient && patient.state==false) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente ya esta eliminado'
            })
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el estado del Paciente'
        })
    }
    next();
}

const validarEstadoCita = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const cita = await Appointment.findById(id);
        
        if (cita&&cita.state==false) {
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


module.exports={validarEstadoConsult,
                validarEstadoUser, validarEstadoPatient,
                validarEstadoCita}