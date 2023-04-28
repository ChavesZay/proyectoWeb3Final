const existRole = async (role = "") => {

    const test = ['admin', 'public','recepcionista','medico','enfermera'];
    if (!test.includes(role.toLowerCase())) {
        throw new Error("El role ingresado no es valido, solo existen los roles(admin, public,recepcionista,medico,enfermera)");
    }
  };
  
  module.exports = {
   existRole
  };
  