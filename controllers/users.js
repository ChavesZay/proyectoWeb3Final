const { request, response } = require('express');
const Usuario = require('../models/users');
const Doctor=require('../models/doctor.js')
var bcrypt = require('bcryptjs');

const usersGET = async (req = request, res = response) => {
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
  


  const usersGETById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
      const user = await Usuario.find({ 'state': true, '_id':id });
      res.status(200).json({
        msg: "Mensaje desde el metodo GET de usuarios",
        user
      });
    } catch (err) {
      console.log(err);
      throw new Error("Error en el metodo GET");
    }
  };
  

  



const usersPOST = async (req = request, res = response) => {

    try {
        const { name, email, password} = req.body
        const user = new Usuario({ name, email, password});
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
        const {password,...resto } = req.body;
        if (password) {
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(password, salt);
        }
        const users = await Usuario.findOneAndUpdate({'_id':id, 'state':true},resto);

        if(users && users.role.toLowerCase()=='medico'){
            const user=users._id;
            const name=users.name;
            const doctor = await Doctor.find({'state': true,'user':user});
            if(doctor.length==0){
                const speciality= req.body.speciality? req.body.speciality:"Medicina General";
                const doctors= new Doctor({name,user,speciality});
                await doctors.save();
            }
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

        if(user&&user.role.toLowerCase()=='medico'){
            const users=user._id;
            const doctors= await  Doctor.findOneAndUpdate({user:users}, { 'state': false });

        }

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
    usersGETById
}