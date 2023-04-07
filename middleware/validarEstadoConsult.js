const { request, response } = require("express");
const Consult =require('../models/consults.js')

const validarEstadoConsult = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const consulta = await Consult.findById(id);
        
        if (consulta.state==false) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta consulta ya esta eliminada'
            })
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el estado de la consulta'
        })
    }
    next();
}

module.exports={validarEstadoConsult}