const { Router } = require('express');
const { validarJWT } = require('../middleware/validateJWT.js');
const { validate_fields } = require('../middleware/validation-field.js');
const { check } = require('express-validator');
const { validarRolConsulta } = require('../middleware/validarRoles.js')
const { validarPaciente } = require('../middleware/validarPersonas.js')
const { validarEstadoConsult } = require('../middleware/validarEstadoConsult.js')
const { validarTest } = require('../middleware/validarTest.js')

const router = Router();

const { consultGET,
    consultPOST,
    consultPUT,
    consultDELETE,
    agregarDiagnosticoPUT,
    pendingConsultGET,
    completConsulstGET } = require('../controllers/consult.js');

router.get("/", [
    validarJWT,
    validarRolConsulta],
    consultGET);

router.get("/completConsult", [
    validarJWT,
    validarRolConsulta],
    completConsulstGET);

router.get("/pendingConsults", [
    validarJWT,
    validarRolConsulta],
    pendingConsultGET);

router.post("/", [
    validarJWT,
    validarRolConsulta,
    validarPaciente,
    check('dni', 'El dni del paciente es obligatorio').not().isEmpty(),
    check('weight', 'El peso del paciente es obligatorio').not().isEmpty(),
    check('height', 'La altura del paciente es obligatorio').not().isEmpty(),
    check('pressure', 'La presión del paciente es obligatorio').not().isEmpty(),
    check('symptoms', 'Los sintomas del paciente es obligatorio').not().isEmpty(),
    validate_fields,], consultPOST);

router.put("/:id", [
    validarJWT,
    validarRolConsulta,
    check('id', 'ID no es valido de mongo').isMongoId(),
    validate_fields],
    consultPUT);

router.put("/agregarDiagnostico/:id", [
    validarJWT,
    validarRolConsulta,
    check('diagnosis', 'El diagnostico del paciente es obligatorio').not().isEmpty(),
    check('medicines', 'Las medicinas recetadas del paciente es obligatorio').not().isEmpty(),
    check('id', 'ID no es valido de mongo').isMongoId(),
    validate_fields
], agregarDiagnosticoPUT)

router.delete("/:id",
    [validarJWT,
        validarRolConsulta,
        validarEstadoConsult,
        check('id', 'ID no es valido de mongo').isMongoId(),
        validate_fields],
    consultDELETE);


module.exports = router;