const { request, response } = require('express');
const Appointment = require('../models/appointment.js');
const Patient = require('../models/patients.js');
const Doctor = require('../models/doctor.js');
const { horarioDisponible } = require('../helpers/horarioDisponible')



const citasGET = async (req = request, res = response) => {
    try {
        const citas = await Appointment.find({ 'state': true });
        const doctors = await Doctor.find({ 'state': true });
        res.json(
            {
                ok: 200,
                doctors,
                citas
            }
        );
    
    } catch (error) {
        throw new Error('Error en el metodo GET de citas');
    }
}

//Eliminar no se ocupa
const citasHorarioPOST = async (req = request, res = response) => {
    try {
        const { date, doctor } = req.body;
        console.log(req.body);
         const fecha=new Date(date);
        const hDisponible = horarioDisponible(fecha, doctor);
          res.json(
            {
                ok: 200,
                date,
                doctor,
                hDisponible
            }
        );
    } catch (error) {
        console.log(error);
        throw new Error('Error en el metodo Post de horarios de citas');
    }
}


//este no se ocupa

const horariosGet = async (req = request, res = response) => {
    try {
        const { doctor } = req.params;
        const { date } = req.query;
        const fecha = new Date(date.split('T')[0]);
        const hDisponible = await horarioDisponible(fecha, doctor);
        res.json(
            {
                ok: 200,
                doctor,
                hDisponible
            }
        );
      
    } catch (error) {
        console.log(error);
        throw new Error('Error en el metodo GET de Horarios');
    }
}



const createCitaGET = async (req = request, res = response) => {
    try {
        const { doctor } = req.params;
        const { date } = req.query;
        const doct = await Doctor.find({ '_id': doctor,'state':true });
        const patient = await Patient.find({'state':true});
        const fecha = new Date(date.split('T')[0]);
        const horario = await horarioDisponible(fecha, doctor);
       res.json(
            {
                ok: 200,
                patients: patient,
                doct: doct[0],
                horario: horario
            }
        );
    
    } catch (error) {
        throw new Error('Error al obtener los datos para crear una cita');
    }
}


const saveCitaPOST = async (req = request, res = response) => {
    try {
        let { dni, date, doctor_id } = req.body;
        let doctor = await Doctor.find({ '_id': doctor_id });
        let patient = await Patient.find({ 'dni': dni });
        patient = patient[0];
        doctor = doctor[0];
        user=req.user;
        datetime = new Date(date);
        const cita = new Appointment({ patient, datetime, doctor,user});
        await cita.save();
       res.json({
            ok: 200,
            cita
        });
       
    } catch (error) {
        throw new Error('Error al guardar la cita');
    }
}

const deteleCita = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const cita = await Appointment.findByIdAndUpdate(id,{ 'state': false });
        res.json({
            ok: 200,
            msg: "Mensaje desde el metodo Delete",
            cita
        });

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    citasGET,
    citasHorarioPOST,
    horariosGet,
    createCitaGET,
    saveCitaPOST,
    deteleCita
}
