const { request, response } = require("express");
const Paciente = require("../models/patients.js");
var bcrypt = require("bcryptjs");



const patientsGET = async (req = request, res = response) => {
  try {
    const patients = await Paciente.find({"state":true});
    res.status(200).json({
      msg: "Mensaje desde el metodo GET",
      patients,
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: 400,
      msg: "Error al mostrar los pacientes"
  })
  }
};



const patientsGETById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const patient = await Paciente.find({"state":true,'_id':id});
    res.status(200).json({
      msg: "Mensaje desde el metodo GET",
      patient
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: 400,
      msg: "Error al mostrar el paciente"
  })
  }
};

const patientsPOST = async (req = request, res = response) => {
  try {
    const {
      name,
      lastname,
      phone,
      dni,
      weight,
      age,
      height,
      diseases,
      allergicMedicines,
      bloodType,
      pressure,
      emergencyContact,
    } = req.body;
    const paciente = new Paciente({
      name,
      lastname,
      phone,
      dni,
      weight,
      age,
      height,
      diseases,
      allergicMedicines,
      bloodType,
      pressure,
      emergencyContact
    });
    await paciente.save();
    res.json({
      ok: 200,
      msg: "Mensaje desde el metodo POST",
      paciente,
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: 400,
      msg: "Error al guardar el paciente"
  })
  }
};

const patientsPUT = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    //
    const { password, google, ...resto } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password, salt);
    }

    const updated = await Paciente.findByIdAndUpdate(id, resto);
    res.json({
      ok: 200,
      msg: "Mensaje desde el metodo PUT",
      updated,
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: 400,
      msg: "Error al modificar el paciente"
  })
  }
};

const patientsDELETE = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };
    const  patients = await Paciente.findByIdAndUpdate(filter,{state:false});
    res.json({
      ok: 200,
      msg: "Mensaje desde el metodo DELETE",
      patients,
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: 400,
      msg: "Error al eliminar el paciente"
  })
  }
};

module.exports = {
  patientsGET,
  patientsGETById,
  patientsPOST,
  patientsPUT,
  patientsDELETE,
};
