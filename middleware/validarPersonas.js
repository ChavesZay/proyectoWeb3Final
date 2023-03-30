const { request, response } = require("express");
const Patient=require('../models/patients.js');
const Doctor=require('../models/doctor.js');

//Valida si el paciente o doctor estan registrados
const validarPersonas = async (req = request, res = response, next) => {
    try {
        let { patient_id,doctor_id } = req.body;
        let doc = await Doctor.find({ '_id': doctor_id, 'state':true });
        let paciente = await Patient.find({ '_id': patient_id });
        if(!doc[0]){
            return res.status(400).json({
                ok:false,
                msg:'Este doctor no trabaja en la clinica '
            })
        }else if(!paciente[0]){
            return res.status(400).json({
                ok:false,
                msg:'Este paciente no se ha registrado'
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error las personas registradas'
        })
    }
    next();
}
module.exports={
    validarPersonas
}