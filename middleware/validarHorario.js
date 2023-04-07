const { request, response } = require("express");
const Appointment = require('../models/appointment.js');

//Valida que el doctor no tenga una cita a esa hora y que no sea un domingo
const validarHorario = async (req = request, res = response, next) => {
    try {
        let { date, doctor_id } = req.body;
        const fecha = new Date(date);
        const cita = await Appointment.find({
            $and: [{ 'state': true }, { 'doctor._id': doctor_id }, { datetime: fecha }]
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

const validarHora = async (req = request, res = response, next) => {
    try {
        let { date} = req.body;
        const fecha = new Date(date);
        const hora=(fecha.toISOString().split('T')[1]).split(':')[0]
        if(hora<8||hora>16){
            return res.status(400).json({
                ok: false,
                msg: 'La hora esta fuera de horario, el horario es de 8am a 5pm'
            })
          }
          else if(fecha.getMinutes()!=0 && fecha.getMinutes()!=30){
            return res.status(400).json({
                ok: false,
                msg: 'La hora esta fuera de horario, las citas son cada 30min'
            })
          }
           
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el Hora',
           
        })
    }
    next();

}


module.exports = { validarHorario,validarHora }