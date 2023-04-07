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
        throw new Error('Error en el metodo GET de consultas');
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
        throw new Error('Error en el metodo GET de consultas');
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
        throw new Error('Error en el metodo GET de consultas');
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
        throw new Error('Error en el metodo POST de consultas');
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
        throw new Error('Error en el metodo agregar diagnostico de consultas');
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
        throw new Error('Error en el metodo PUT de consultas');
    }
}

//Elimina la consulta cambiando el estado a false
const consultDELETE = async (req = request, res = response) => {
    const { id } = req.params;
        const consulta = await Consult.findByIdAndUpdate(id,{ 'state': false });
        let patient = await Patient.findOneAndUpdate({ dni: consulta.patient.dni }, { $pull:{ pressure: consulta.pressure, weight:consulta.weight }});
       
        res.json({
            ok: 200,
            msg: "Mensaje desde el metodo Delete",
            consulta
        })
}

module.exports = {
    consultGET,
    consultPOST,
    consultPUT,
    consultDELETE,
    agregarDiagnosticoPUT,
    pendingConsultGET,
    completConsulstGET
}