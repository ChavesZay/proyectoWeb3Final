const { request, response } = require('express');
const Consult = require('../models/consults.js');

const obtenerTestId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const test = await Consult.findById(id, { 'test': 1, '_id': 1 });
        res.status(200).json(
            {
                ok: 200,
                test
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al obtener el test del paciente"
        })
    }
}

const obtenerListTests = async (req = request, res = response) => {
    try {
        const tests = await Consult.find({ state: true, 'test.testCategory': { $ne:"", }, 'test': { $not: { $size: 0 } } }, {'patient':1,'test': 1,'date':1});
        res.status(200).json(
            {
                ok: 200,
                tests
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al obtener la lista de tests del paciente"
        })
    }
}

const actualizarTestOrina = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const examenes = req.body
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": examenes.testType } },
            { arrayFilters: [{ "elem.testCategory": "Orina" }], new: true });
        res.status(200).json(
            {
                ok: "Los examenes de orina se agregaron correctamente",
                newConsult
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al insertar el test de orina del paciente"
        })
    }
}

const actualizarTestSangre = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const examenes = req.body
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": examenes.testType } },
        { arrayFilters: [{ "elem.testCategory": "Sangre" }], new: true });
        res.status(200).json(
            {
                ok: "Los examenes de sangre se agregaron correctamente",
                newConsult
            }
        );
    } catch (error) {
        res.json({
            ok: 400,
            msg: "Error al insertar el test de sangre del paciente"
        })
    }
}

const elimianarTestOrina = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": {} } },
        { arrayFilters: [{ "elem.testCategory": "Orina" }], new: true });
        res.status(200).json(
            {
                ok: "Los examenes de orina se eliminaron correctamente",
                newConsult
            }
        );
    } catch (error) {
        
        res.json({
            ok: 400,
            msg: "Error al eliminar los tests de orina del paciente"
        })
    }
}

const elimianarTestSangre = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": {} } },
        { arrayFilters: [{ "elem.testCategory": "Sangre" }], new: true });
        res.status(200).json(
            {
                ok: "Los examenes de sangre se eliminaron correctamente",
                newConsult
            }
        );
    } catch (error) {
        
        res.json({
            ok: 400,
            msg: "Error al eliminar los tests de sangre del paciente"
        })
    }
}

Array.prototype.toLowerCase = function () {
    return this.map(word => word.toLowerCase())
};

module.exports = {
    obtenerTestId,
    actualizarTestOrina,
    actualizarTestSangre,
    obtenerListTests,
    elimianarTestOrina,
    elimianarTestSangre
}