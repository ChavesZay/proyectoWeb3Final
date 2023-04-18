
const { request, response } = require("express");

const validarTest = async (req = request, res = response, next) => {
    try {
        const {testCategory } = req.body;
        const test = ['sangre', 'orina'];

        if (testCategory) {
            testCategory.forEach(element => {
                if (!test.includes(element.toLowerCase())) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El tipo de examen no es valido',
                        element
                    })
                }
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error en el tipo de test'
        })
    }
    next();
}

module.exports = { validarTest }

