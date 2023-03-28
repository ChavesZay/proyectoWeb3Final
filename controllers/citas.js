const { request, response } = require('express');
const Cita = require('../models/citas.js');
const Usuario = require('../models/users.js');
const Patient = require('../models/patients.js');
const Doctor = require('../models/doctor.js');
const{horarioDisponible}=require('../helpers/horarioDisponible')



const citasGET = async (req = request, res = response) => {
    try {
        const citas = await Cita.find({ 'state': true });
        const doctors = await Doctor.find({ 'state': true });
        /*res.json(
            {
                ok:200,
                doctors,
                citas
            }
        );*/
        res.render("citas", { doctors: doctors, citas: citas });

    } catch (error) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

//este no es necesario
const citasHorarioPOST = async (req = request, res = response) => {
    try {
        const { date, doctor } = req.body;
        console.log(req.body);
        var ruta = "createCita/" + doctor + "?date=" + date;
        res.redirect(ruta);
    } catch (error) {
        console.log(error);
        throw new Error('Error en el metodo GET');
    }
}


//este no se ocupa

const horariosGet = async (req = request, res = response) => {
    try {
        const { doctor } = req.params;
        const { date } = req.query;
        const fecha = new Date(date.split('T')[0]);
        const citas = await Cita.find({
            $and: [{ 'estado': true }, { 'doctor._id': doctor }, { datetime: { $gte: fecha } },
            { datetime: { $lt: new Date(fecha.getTime() + 1440 * 60000) } }]
        }, { datetime: 1, _id: 0 });
        const hDisponible = horarioDisponible(fecha, citas);

        res.json(
            {
                ok:200,
                doctors,
                citas
            }
        );
        res.render("horariosDisponibles", { horarios: hDisponible, doctor: doctor });
    } catch (error) {
        console.log(error);
        throw new Error('Error en el metodo GET');
    }
}



const createCitaGET = async (req = request, res = response) => {
    try {
        const { doctor } = req.params;
        const { date } = req.query;
        const doct = await Doctor.find({ '_id': doctor });
        const patient = await Patient.find({});
        const fecha = new Date(date.split('T')[0]);
        const citas = await Cita.find({"doctor._id": doctor, state: true,
            datetime: {$gte: fecha.toISOString(),$lt: new Date(fecha.getTime() + 1440 * 60000).toISOString()}});
        const horario = await horarioDisponible(fecha, citas);
       
       /* res.json(
            {
                ok:200,
                 patients: patient,
                 doct: doct[0], 
                 horario: horario
            }
        );*/
       res.render("createCita", {  patients: patient,doct: doct[0], horario: horario });
    } catch (error) {
        console.log(error);
    }
}


const saveCitaPOST = async (req = request, res = response) => {
    try {
        let { id_Patient, horario, idDoctor } = req.body;
        let doctor = await Doctor.find({ '_id': idDoctor });
        let patient = await Patient.find({ '_id': id_Patient });
        patient = patient[0];
        doctor = doctor[0];
        datetime = new Date(horario);
        const cita = new Cita({ patient, datetime, doctor });
        await cita.save();
        res.redirect('/api/citas');
    } catch (error) {
        console.log(error);
    }
}

const deteleCita=async(req=request, res=response)=>{

    try {
       const {id}=req.params;
       const cita= await Cita.findByIdAndUpdate(id,{'estado':false});
       res.redirect('/api/citas');
    }
    catch(err){
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
