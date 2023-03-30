const { request, response } = require("express");
const Appointment = require('../models/appointment.js');

//Valida que el doctor no tenga una cita a esa hora y que no sea un domingo
const validarHorario = async (req = request, res = response, next) => {
    try {
        let { date, doctor_id } = req.body;
        const fecha = new Date(date);
        const cita = await Appointment.find({
            $and: [{ 'estado': true }, { 'doctor._id': doctor_id }, { datetime: fecha }]
        });

        if (cita.length != 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El horario no esta disponible, el doctor ya tiene una cita agendada'
            })
        } else if (fecha.getDay() == 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Los domingos no se trabaja'
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el Horario'
        })
    }
    next();


}

module.exports = { validarHorario }