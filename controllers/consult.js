const { request, response } = require('express');
const Consult = require('../models/consults.js');
const Patient = require('../models/patients.js');




const consultGET = async (req = request, res = response) => {
    try {
        const consults = await Consult.find({'state': true });
        res.json(
            {
                ok: 200,
                consults
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al mostrar todas las consultas"
        })
    }
}

const consultGETById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const consult = await Consult.find({'state': true,'_id':id });
        res.json(
            {
                ok: 200,
                consult
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al mostrar la consulta"
        })
    }
}
//Lista de consultas con diagnostico
const completConsulstGET = async (req = request, res = response) => {
    try {
        const consults = await Consult.find({diagnosis:{$nin:[""]},state:true});
       
        res.json(
            {
                ok: 200,
                consults
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al mostrar las consultas completas"
        })
    }
}

//Lista de consultas sin diagnostico
const pendingConsultGET = async (req = request, res = response) => {
    try {
        const consults = await Consult.find({'diagnosis':"",'state': true });
        res.json(
            {
                ok: 200,
                consults
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al mostrar las consultas pendientes"
        })
    }
}



//La enfermera inicializa la consulta con los datos del paciente (dni, weight, height, pressure, symptoms)
const consultPOST = async (req = request, res = response) => {
    try {
        const { dni, weight, height, pressure, symptoms} = req.body;
        let patient = await Patient.findOneAndUpdate({dni:dni}, { $push: { pressure: pressure, weight: weight } })
        const consult = new Consult({ patient, weight, height, symptoms, pressure});
        await consult.save();
        res.json(
            {
                ok: 200,
                consult
            }
        )
    } catch (error) {
        console.log(error);
        res.json({
            ok: 400,
            msg: "Error al guardar una consulta"
        })
    }
}

//El doctor agrega en diagnostico (diagnosis, medicines, testCategory)
const agregarDiagnosticoPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { diagnosis, medicines, testCategory } = req.body;
        let test = [];
        if (testCategory) {
            testCategory.forEach(element => {
                test.push({ "testCategory": element})
            });
        }
        const consult = await Consult.findByIdAndUpdate(id, { diagnosis: diagnosis, medicines: medicines, test:test});
        res.json(
            {
                ok: 200,
                consult
            }
        )

    } catch (error) {
        console.log(error)
        res.json({
            ok: 400,
            msg: "Error al agregar el diagnostico a una consulta"
        })
    }
}

//Solo pueden modificar los campos (symptoms, diagnosis, medicines, testCategory)
const consultPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const {symptoms, diagnosis, medicines, testCategory } = req.body;
        
        if (testCategory) {
            var test = [];
            testCategory.forEach(element => {
                test.push({ "testCategory": element })
            });
        }
        
        const consulta = await Consult.findByIdAndUpdate(id,{" symptoms":symptoms,"diagnosis": diagnosis, "medicines":medicines,"test":test});
        res.json(
            {
            ok: 200,
            msg: "Mensaje desde el metodo PUT",
            consulta
        }
        )
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al modificar una consulta"
        })
    }
}

//Elimina la consulta cambiando el estado a false
const consultDELETE = async (req = request, res = response) => {
    try {
        
        const { id } = req.params;
        const consulta = await Consult.findByIdAndUpdate(id,{ 'state': false });
        if(consulta){
            let patient = await Patient.findOneAndUpdate({ dni: consulta.patient.dni }, { $pull:{ pressure: consulta.pressure, weight:consulta.weight }});

        }
       
        res.json({
            ok: 200,
            msg: "Mensaje desde el metodo Delete",
            consulta
        })

    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al eliminar una consulta"
        })
        
    }
   
}

module.exports = {
    consultGET,
    consultGETById,
    consultPOST,
    consultPUT,
    consultDELETE,
    agregarDiagnosticoPUT,
    pendingConsultGET,
    completConsulstGET
}