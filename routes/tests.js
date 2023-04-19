const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { validarJWT } = require("../middleware/validateJWT");
const {validarRolMedicoAdmin } = require('../middleware/validarRoles.js')
const { validarTestOrina } = require('../middleware/validarTestOrina.js')
const { validarTestSangre } = require('../middleware/validarTestSangre.js')

const router = Router();

const { obtenerTestId,
    actualizarTestOrina,
    actualizarTestSangre,
    obtenerListTests,
    elimianarTestOrina,
    elimianarTestSangre } = require('../controllers/tests.js');

router.get("/:id",[
    validarJWT,
    check("id", "ID no valido en mongo").isMongoId(),
    validarRolMedicoAdmin,
],obtenerTestId);

router.get("/",[
    validarJWT,
    validarRolMedicoAdmin,
],obtenerListTests);

router.post("/updateTestOrina/:id", [
    validarJWT,
    validarRolMedicoAdmin,
    validarTestOrina,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields
],actualizarTestOrina);

router.post("/updateTestSangre/:id", [
    validarJWT,
    validarRolMedicoAdmin,
    validarTestSangre,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields
],actualizarTestSangre);

router.post("/delTestOrina/:id", [
    validarJWT,
    validarRolMedicoAdmin,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields
],elimianarTestOrina);

router.post("/delTestSangre/:id",[
    validarJWT,
    validarRolMedicoAdmin,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields
],elimianarTestSangre);

module.exports = router;