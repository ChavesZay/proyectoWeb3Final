const { Router } = require('express');
const { validarJWT } = require('../middleware/validateJWT.js');
const { validate_fields } = require('../middleware/validation-field.js');
const { check } = require('express-validator');
const { validarRolMedicoAdmin } = require('../middleware/validarRoles.js')
const { validarPaciente } = require('../middleware/validarPersonas.js')
const { validarEstadoConsult } = require('../middleware/validarEstadoConsult.js')
const { validarTest } = require('../middleware/validarTest.js')

const router = Router();

const { consultGET,
    consultGETById,
    consultPOST,
    consultPUT,
    consultDELETE,
    agregarDiagnosticoPUT,
    pendingConsultGET,
    completConsulstGET } = require('../controllers/consult.js');

router.get("/", [
    validarJWT,
    validarRolMedicoAdmin],
    consultGET);

router.get("/:id", [
    validarJWT,
    validarRolMedicoAdmin],
    consultGETById);


router.get("/completConsult", [
    validarJWT,
    validarRolMedicoAdmin],
    completConsulstGET);

router.get("/pendingConsults", [
    validarJWT,
    validarRolMedicoAdmin],
    pendingConsultGET);

router.post("/", [
    validarJWT,
    validarRolMedicoAdmin,
    check('dni', 'El dni del paciente es obligatorio').not().isEmpty(),
    check('weight', 'El peso del paciente es obligatorio').not().isEmpty(),
    check('height', 'La altura del paciente es obligatorio').not().isEmpty(),
    check('pressure', 'La presión del paciente es obligatorio').not().isEmpty(),
    check('symptoms', 'Los sintomas del paciente es obligatorio').not().isEmpty(),
    validate_fields, validarPaciente,], consultPOST);

router.put("/:id", [
    validarJWT,
    validarRolMedicoAdmin,
    check('id', 'ID no es valido de mongo').isMongoId(),
    validate_fields],
    consultPUT);

router.put("/agregarDiagnostico/:id", [
    validarJWT,
    validarRolMedicoAdmin,
    check('diagnosis', 'El diagnostico del paciente es obligatorio').not().isEmpty(),
    check('medicines', 'Las medicinas recetadas del paciente es obligatorio').not().isEmpty(),
    check('id', 'ID no es valido de mongo').isMongoId(),
    validate_fields
], agregarDiagnosticoPUT)

router.delete("/:id",
    [validarJWT,
        validarRolMedicoAdmin,
        validarEstadoConsult,
        check('id', 'ID no es valido de mongo').isMongoId(),
        validate_fields],
    consultDELETE);


module.exports = router;
