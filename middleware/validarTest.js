
const { request, response } = require("express");

const validarTest = async (req = request, res = response, next) => {
    try {
        const {testCategory } = req.body;
        if (testCategory) {
            testCategory.forEach(element => {
                if(element.toLowerCase()!="sangre"&&element.toLowerCase()!="orina"){
                    return res.status(400).json({
                        ok: false,
                        msg: 'El tipo de test enviado no existe'
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

