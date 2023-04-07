const { request, response } = require("express");
const Patient = require('../models/patients.js');
const Doctor = require('../models/doctor.js');

//Valida si el paciente o doctor estan registrados
const validarDoctor = async (req = request, res = response, next) => {
    try {
        let { doctor_id } = req.body;
        let doc = await Doctor.find({ '_id': doctor_id, 'state': true });
        if (!doc[0]) {
            return res.status(400).json({
                ok: false,
                msg: 'Este doctor no trabaja en la clinica '
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error las personas registradas'
        })
    }
    next();
}

const validarPaciente = async (req = request, res = response, next) => {
    try {
        let { dni } = req.body;
        let paciente = await Patient.find({ 'dni': dni,'state':true });

        if (!paciente[0]) {
            return res.status(400).json({
                ok: false,
                msg: 'Este paciente no se ha registrado'
            })
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error las personas registradas'
        })
    }
    next();
}

module.exports = {
    validarDoctor,
    validarPaciente
}