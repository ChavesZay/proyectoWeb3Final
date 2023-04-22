const { request, response } = require('express');
const Consult = require('../models/consults.js');

const obtenerTestId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const test = await Consult.findById(id, { 'test': 1, '_id': 1 });
        res.json(
            {
                ok: 200,
                test
            }
        );
    } catch (error) {
        console.log(error)
        throw new Error('Error en el metodo obtenerTestId');
    }
}

const obtenerListTests = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tests = await Consult.find({ state: true, 'test.testCategory': { $ne:"", }, 'test': { $not: { $size: 0 } } }, {'patient':1,'test': 1,'date':1});
        res.json(
            {
                ok: 200,
                tests
            }
        );
    } catch (error) {
        console.log(error)
        throw new Error('Error en el metodo obtenerListTests');
    }
}

const actualizarTestOrina = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const examenes = req.body
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": examenes.testType } },
            { arrayFilters: [{ "elem.testCategory": "Orina" }], new: true });
        res.json(
            {
                ok: 200,
                newConsult
            }
        );
    } catch (error) {
        throw new Error('Error al actualizar test de orina');
    }
}

const actualizarTestSangre = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const examenes = req.body
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": examenes.testType } },
        { arrayFilters: [{ "elem.testCategory": "Sangre" }], new: true });
        res.json(
            {
                ok: 200,
                newConsult
            }
        );
    } catch (error) {
        throw new Error('Error al actualizar test de sangre');
    }
}

const elimianarTestOrina = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": [] } },
        { arrayFilters: [{ "elem.testCategory": "Orina" }], new: true });
          res.json(
            {
                ok: 200,
                newConsult
            }
        );
    } catch (error) {
        console.log(error)
        throw new Error('Error al eliminar test de sangre');
    }
}

const elimianarTestSangre = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const newConsult = await Consult.findByIdAndUpdate(id, { $set: { "test.$[elem].testType": [] } },
        { arrayFilters: [{ "elem.testCategory": "Sangre" }], new: true });
          res.json(
            {
                ok: 200,
                newConsult
            }
        );
    } catch (error) {
        console.log(error)
        throw new Error('Error al eliminar test de sangre');
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