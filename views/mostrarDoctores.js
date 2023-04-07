//select del HTML
let selectDoctores=document.getElementById(doctor);

//Vector con los objetos
let doctors=[]

function mostrarDoctores(select,doctors){
    let elementos='  <option selected disabled>Seleccionar</option>'

    doctors.forEach(doctor => {
        elementos += '<option value="'+doctor._id+'">'+doctor.name+" ---"+doctor.speciality+'</option>'
    });
    select.innerHTML=elementos
}

mostrarDoctores(selectDoctores,doctors);