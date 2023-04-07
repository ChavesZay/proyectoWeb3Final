const Usuario = require("../models/users");
const Paciente = require("../models/patients");

const db_ExistEmail = async (email = "") => {
  const existEmail = await Usuario.findOne({ email }).exec();
  if (existEmail) {
    console.log("El email ya existe");
    throw new Error("El email ya existe");
  }
};

const db_ExistDNI = async (dni = "") => {
  const existDNI = await Paciente.findOne({ dni }).exec();
  if (existDNI) {
    console.log("El DNI ya se encuentra asignado a un paciente");
    throw new Error("El DNI ya se encuentra asignado a un paciente");
  }
};

module.exports = {
  db_ExistEmail,
  db_ExistDNI,
};
