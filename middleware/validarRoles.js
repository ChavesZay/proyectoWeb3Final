const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const Appointment = require('../models/appointment.js')

//Valida que sea un rol autorizado y que el rol public solo aplique una cita
const validarRolCita = async (req = request, res = response, next) => {
    const token = req.header('token');
    try {
        const roles = ['recepcionista', 'public', 'admin'];
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { id } = payload;
        req.user = id;
        const user = await User.findById(id);
        if (!roles.includes(user.role.toLowerCase())) {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permiso de acceso al modulo de citas',
                user
            })
        }
        else if (user.role.toLowerCase() == "public") {
            const cita = await Appointment.find({ 'user': user._id, 'state': true });
            if (cita.length != 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No tienes permiso de acceso al modulo de citas, ya has creado una cita'
                })
            }

        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error de permisos de acceso'
        })
    }
    next();
}


const validarRolDelete = async (req = request, res = response, next) => {
    const token = req.header('token');
    try {
        const roles = ['recepcionista', 'admin'];
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { id } = payload;
        req.user = id;
        const user = await User.findById(id);
        if (!roles.includes(user.role.toLowerCase())) {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permiso de acceso a eliminar de citas'
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error de permisos de acceso'
        })
    }
    next();
}


const validarRolMedicoAdmin = async (req = request, res = response, next) => {
    const token = req.header('token');
    try {
        const roles = ['medico', 'admin'];
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { id } = payload;
        const user = await User.findById(id);
        if (!roles.includes(user.role.toLowerCase())) {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permiso de acceso a este modulo',
                user
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error de permisos de acceso'
        })
    }
    next();
}

const validarRolInicioConsult = async (req = request, res = response, next) => {
    const token = req.header('token');
    try {
        const roles = ['medico', 'admin','enfermera'];
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { id } = payload;
        const user = await User.findById(id);
        if (!roles.includes(user.role.toLowerCase())) {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permiso de acceso a este modulo',
                user
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error de permisos de acceso'
        })
    }
    next();
}

const validarRolUser = async (req = request, res = response, next) => {
    const token = req.header('token');
    try {
        const roles = ['admin'];
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { id } = payload;
        const user = await User.findById(id);
        if (!roles.includes(user.role.toLowerCase())) {
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permiso de acceso a modificar o eliminar los usuarios',
                user
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error de permisos de acceso'
        })
    }
    next();
}




module.exports = {
    validarRolCita,
    validarRolDelete,
    validarRolMedicoAdmin,
    validarRolUser,
    validarRolInicioConsult
}
