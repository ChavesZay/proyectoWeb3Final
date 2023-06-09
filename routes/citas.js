const { Router } = require('express');
const { validate_fields } = require('../middleware/validation-field.js');
const { check } = require('express-validator');
const { validarHorario, validarHora } = require('../middleware/validarHorario.js')
const router = Router();
const { validarJWT } = require('../middleware/validateJWT.js')
const { validarRolCita, validarRolDelete } = require('../middleware/validarRoles.js')
const { validarFecha, validarFechaQuerry } = require('../middleware/validarFecha.js')
const { validarDoctor, validarPaciente } = require('../middleware/validarPersonas.js')
const { validarEstadoCita } = require('../middleware/validarEstados.js')

const {
    citasGET,
    citasGETById,
    horariosGet,
    createCitaGET,
    saveCitaPOST,
    deteleCita,
    doctorsCitasGET
} = require('../controllers/citas.js');

//lista de citas y elegir fecha y doctor para una cita
router.get('/', [
    validarJWT,
    validarRolCita],
    citasGET);

router.get('/one/:id', [
    validarJWT,
    validarRolCita,
    check('id', 'El ID no es valido de una cita').isMongoId(),
    validate_fields],
    citasGETById);

router.get('/doctors', [
    validarJWT,
    validarRolCita],
    doctorsCitasGET);

//lista de horarios Disponibles
router.get('/listHorarios/:doctor', [
    validarJWT,
    validarRolCita,
    validarFechaQuerry,
    check('doctor', 'ID del doctor no es valido de mongo').isMongoId(),
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    validate_fields],
    horariosGet);

//lista de pacientes para crear la cita
router.get("/createCita/:doctor", [
    validarJWT,
    validarRolCita,
    check('doctor', 'ID del doctor no es valido de mongo').isMongoId(),
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    validate_fields], createCitaGET);



//manda los datos de la cita
router.post('/createCita', [
    validarJWT,
    validarRolCita,
    check('dni', 'El dni del paciente es obligatorio y dede ser valido').not().isEmpty(),
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    check('doctor_id', 'El doctor es obligatorio y dede ser valido').isMongoId(),
    validate_fields,
    validarFecha,
    validarHorario,
    validarHora,
    validarPaciente,
    validarDoctor,], saveCitaPOST);




//cambia de estado de la cita
router.delete("/:id",
    [validarJWT,
        validarRolDelete,
        check('id', 'ID no es valido de mongo').isMongoId(),
        validate_fields,
        validarEstadoCita,]
    , deteleCita);

module.exports = router;