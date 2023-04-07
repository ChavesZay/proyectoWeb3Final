const { request, response } = require('express');
const Usuario = require('../models/users');
const Doctor=require('../models/doctor.js')
var bcrypt = require('bcryptjs');

const usersGETPOST = async (req = request, res = response) => {
    try {
      const users = await Usuario.find({ 'state': true });
      res.status(200).json({
        msg: "Mensaje desde el metodo GET de usuarios",
        users,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Error en el metodo GET");
    }
  };
  
  const usersGET = async (req = request, res = response) => {
    try {
      // const rol = { rol: "public", google: true };
      //const {limit}=req.query;
      const users = await Usuario.find({ 'state': true });
      res.render("users", { users });
    } catch (err) {
      console.log(err);
      throw new Error("Error en el metodo GET");
    }
  };

  



const usersPOST = async (req = request, res = response) => {

    try {
        const { name, email, password, google, role, state } = req.body
        const user = new Usuario({ name, email, password, google, role, state });
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                user
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}


const usersPUT = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const {password,name, ...resto } = req.body;
        if (password) {
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(password, salt);
        }
        const users = await Usuario.findByIdAndUpdate(id, resto);

        if(users.role.toLowerCase()=='medico'){
            const user=users._id;
            const name=users.name
            const speciality= req.body.speciality? req.body.speciality:"Medicina General";
            const doctors= new Doctor({name,user,speciality});
            await doctors.save();
        }

        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo PUT",
                users
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo PUT');
    }
}


const usersDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        //const user= await Usuario.findByIdAndDelete(id);
        const user = await Usuario.findByIdAndUpdate(id, { 'state': false });
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo DELETE",
                user
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}


module.exports = {
    usersGET,
    usersPOST,
    usersPUT,
    usersDELETE,
    usersGETPOST
}