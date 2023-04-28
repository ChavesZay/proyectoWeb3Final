const { request, response } = require("express");
const Consult = require('../models/consults.js');

const validarTestOrina = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const testsOrina = ['glucosa', 'eritrocitos', 'color', 'leucocitos']
        const tests = await Consult.findById(id, { 'test': 1, '_id': 0 });
        const examenes = req.body.testType || {};
        const examenesArray = Object.keys(examenes).filter(e => testsOrina.includes(e.trim().toLowerCase()));
        if (examenesArray.length !== Object.keys(examenes).length) {
            return res.status(400).json({
                ok: false,
                msg: "Error! Se encontraron examenes que no son de sangre"
            });
        }
        if (tests.test.length === 1) {
            if (tests.test[0].testCategory.toLocaleLowerCase() !== "orina") {
                return res.status(400).json({
                    ok: false,
                    msg: "Error, Vaya a la ruta de sangre para agregar los examenes correctamente"
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al validar test de Orina'
        })
    }
    next();
}

module.exports = {
    validarTestOrina
}
