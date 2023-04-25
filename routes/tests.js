const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { validarJWT } = require("../middleware/validateJWT");
const {validarRolMedicoAdmin } = require('../middleware/validarRoles.js')
const { validarTestOrina } = require('../middleware/validarTestOrina.js')
const { validarTestSangre } = require('../middleware/validarTestSangre.js')
const {validarEstadoConsult } = require('../middleware/validarEstados.js')

const router = Router();

const { obtenerTestId,
    actualizarTestOrina,
    actualizarTestSangre,
    obtenerListTests,
    elimianarTestOrina,
    elimianarTestSangre } = require('../controllers/tests.js');

router.get("/:id",[
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
    validarJWT,
    validarRolMedicoAdmin,
    validarEstadoConsult
],obtenerTestId);

router.get("/",[
    validarJWT,
    validarRolMedicoAdmin
],obtenerListTests);

router.post("/updateTestOrina/:id", [
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
    validarJWT,
    validarRolMedicoAdmin,
    validarEstadoConsult,
    validarTestOrina
],actualizarTestOrina);

router.post("/updateTestSangre/:id", [
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
    validarJWT,
    validarRolMedicoAdmin,
    validarEstadoConsult,
    validarTestSangre
],actualizarTestSangre);

router.post("/delTestOrina/:id", [
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
    validarJWT,
    validarRolMedicoAdmin,
    validarEstadoConsult
],elimianarTestOrina);

router.post("/delTestSangre/:id",[
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
    validarJWT,
    validarRolMedicoAdmin,
    validarEstadoConsult
],elimianarTestSangre);

module.exports = router;