const {Router}=require('express');
const { validate_fields } = require('../middleware/validation-field.js');
const { check } = require('express-validator');
const {validarHorario}=require('../middleware/validarHorario.js')
const router=Router();
const {validarJWT}=require('../middleware/validateJWT.js')
const { validarRolCita}=require('../middleware/validarRolCita.js')
const{validarFecha}=require('../middleware/validarFecha.js')
const{validarPersonas}=require('../middleware/validarPersonas.js')
const {
    citasGET,
    citasHorarioPOST,
    horariosGet,
    createCitaGET,
    saveCitaPOST,
    deteleCita
} = require('../controllers/citas.js');

//lista de citas y elegir fecha y doctor para una cita
router.get('/',citasGET);

//lista de horarios Disponibles
router.get('/listHorarios/:doctor',horariosGet);


//lista de pacientes para crear la cita
router.get("/createCita/:doctor", createCitaGET);


//eliminar no se ocupa
router.post('/horarios',citasHorarioPOST);

//manda los datos de la cita
router.post('/createCita', [
    validarJWT,
    validarFecha,
    validarRolCita,
    validarHorario,
    validarPersonas,
    check('patient_id', 'El paciente es obligatorio y dede ser valido').isMongoId(),
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    check('doctor_id', 'El doctor es obligatorio y dede ser valido').isMongoId(),
    validate_fields], saveCitaPOST);




//cambia de estado de la cita
router.delete("/deteleCita/:id",  deteleCita);
module.exports = router;