
const horarioDisponible=(fecha,citas)=>{
    var fechaInicial = new Date(fecha.getTime() + 480 * 60000);
    var fechaFinal = new Date(fecha.getTime() + 1020 * 60000);
    var horariosD = [];
    var horarioO = [];
    citas.forEach(cita => {
        horarioO.push(cita.datetime.toString());
    });

    console.log(horarioO);

    while (fechaInicial < fechaFinal) {
        if (horarioO.indexOf(fechaInicial.toString()) == -1) {
            horariosD.push(new Date(fechaInicial.getTime()));
        }

        fechaInicial.setTime(fechaInicial.getTime() + 1800000)
    }
    console.log(horariosD);
    return horariosD;
}
module.exports={horarioDisponible}