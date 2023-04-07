
const Appointment=require("../models/appointment.js");


const horarioDisponible= async(date,doctor)=>{
    const fecha=new Date(date);
    var fechaInicial = new Date(fecha.getTime() + 480 * 60000);
    var fechaFinal = new Date(fecha.getTime() + 1020 * 60000);
    var horariosD = [];
    var horarioO = [];

    const citas = await Appointment.find({
        $and: [{ 'state': true }, { 'doctor._id': doctor }, { datetime: { $gte: fecha } },
        { datetime: { $lt: new Date(fecha.getTime() + 1440 * 60000) } }]
    }, { datetime: 1, _id: 0 });
    
    citas.forEach(cita => {
        horarioO.push(cita.datetime.toString());
    });

    while (fechaInicial < fechaFinal) {
        if (horarioO.indexOf(fechaInicial.toString())==-1) {
            horariosD.push(new Date(fechaInicial.getTime()));
        }

        fechaInicial.setTime(fechaInicial.getTime() + 1800000)
    }
    return horariosD;
}
module.exports={horarioDisponible}