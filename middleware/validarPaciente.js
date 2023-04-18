const Paciente = require("../models/patients");

const db_ExistDNI = async (dni = "") => {
  const existDNI = await Paciente.findOne({ dni }).exec();
  if (existDNI) {
    console.log("El DNI ya se encuentra asignado a un paciente");
    throw new Error("El DNI ya se encuentra asignado a un paciente");
  }
};

module.exports = {
  db_ExistDNI,
};