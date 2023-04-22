const { request, response } = require("express");
const Consult = require('../models/consults.js');

const validarTestSangre = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const testsSangre = ['hemoglobina', 'hematocrito', 'trigliceridos', 'colesterol total', 'acido urico', 'creatinina']
        const tests = await Consult.findById(id, { 'test': 1, '_id': 0 });
        const examenes = req.body.testType || {};
        const examenesArray = Object.keys(examenes).filter(e => testsSangre.includes(e.trim().toLowerCase()));

        if (examenesArray.length !== Object.keys(examenes).length) {
            return res.status(400).json({
                ok: false,
                msg: "Error! Se encontraron examenes que no son de sangre"
            });
        }

        if (tests.test.length === 1) {
            if (tests.test[0].testCategory.toLocaleLowerCase() !== "sangre") {
                return res.status(400).json({
                    ok: false,
                    msg: "Error, Vaya a la ruta de orina para agregar los examenes correctamente"
                });
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error al validar test de Sangre'
        })
    }
    next();
}

module.exports = {
    validarTestSangre
}
