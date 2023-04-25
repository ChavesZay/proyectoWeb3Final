
const { request, response } = require("express");

const validarTest = async (req = request, res = response, next) => {
    try {
        const {testCategory } = req.body;
        const test = ['sangre', 'orina'];
        let hasInvalidElement=false;
        if (testCategory) {
            testCategory.forEach(element => {
                if (!test.includes(element.toLowerCase())) {
                   hasInvalidElement=true;
                }
            });
        }
        if(hasInvalidElement){
            return res.status(400).json({
                ok: false,
                msg: 'Los tipos de examenes no son validos, solo se aceptan de orina y sangre'
            })
        }

        if(testCategory&&testCategory.length>2){
            return res.status(400).json({
                ok: false,
                msg: 'El paciente solo puede tener 2 tipos de examenes'
            })
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

