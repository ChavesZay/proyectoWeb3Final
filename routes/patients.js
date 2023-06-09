
const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middleware/validation-field");
const { validarRolMedicoAdmin } = require('../middleware/validarRoles.js')
const { validarJWT } = require("../middleware/validateJWT");
const { validarEstadoPatient } = require('../middleware/validarEstados.js')

const { db_ExistDNI } = require("../middleware/validarPaciente");
const {
  patientsGET,
  patientsGETById,
  patientsPOST,
  patientsPUT,
  patientsDELETE,
} = require("../controllers/patients");

const router = Router();


router.get("/", [validarJWT,  validarRolMedicoAdmin], patientsGET);

router.get("/:id", [
  validarJWT,
  validarRolMedicoAdmin,
  check('id', 'El ID no es valido de un paciente').isMongoId(),
  validate_fields
], patientsGETById);


router.post(
  "/",
  [validarJWT,
    validarRolMedicoAdmin,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("dni", "El DNI es obligatorio").not().isEmpty(),
    check("dni").custom((dni) => db_ExistDNI(dni)),
    check("phone", "El teléfono debe tener un formato válido")
      .optional()
      .isMobilePhone(),
    check("age", "La edad debe estar entre 0 y 150 años").isInt({
      min: 0,
      max: 150,
    }),
    check("height", "La altura debe tener un formato válido (cm/m)").matches(
      /^(\d+)(cm|m)$/
    ),
    check(
      "bloodType",
      "El tipo de sangre debe ser válido A+, A-, B+, B-, AB+, AB-, O+, O-, Rh+, Rh-"
    )
      .optional()
      .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Rh+", "Rh-"]),
    check("allergicMedicines", "Los medicamentos alérgicos son obligatorios")
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.name",
      "El nombre del contacto de emergencia es obligatorio"
    )
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.phone",
      "El teléfono del contacto de emergencia debe tener un formato válido"
    ).isMobilePhone(),
    check(
      "emergencyContact.*.relationship",
      "El parentesco del contacto de emergencia es obligatorio"
    )
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.address",
      "La dirección del contacto de emergencia es obligatoria"
    )
      .not()
      .isEmpty(),

    validate_fields,
  ],
  patientsPOST
);

router.put("/:id", [
  validarJWT,
  validarRolMedicoAdmin,
  check('id', 'El ID no es valido de un paciente').isMongoId(),
  check("phone", "El teléfono debe tener un formato válido")
  .optional()
  .isMobilePhone(),
check("age", "La edad debe estar entre 0 y 150 años") .optional().isInt({ min: 0, max: 150,}),
check("height", "La altura debe tener un formato válido (cm/m)").optional().matches(/^(\d+)(cm|m)$/),
check("bloodType","El tipo de sangre debe ser válido A+, A-, B+, B-, AB+, AB-, O+, O-, Rh+, Rh-")
.optional()
.isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Rh+", "Rh-"]),
check(
  "emergencyContact.*.name","El nombre del contacto de emergencia es obligatorio"
).optional().not().isEmpty(),
check(
  "emergencyContact.*.phone",
  "El teléfono del contacto de emergencia debe tener un formato válido"
).optional().isMobilePhone(),
check(
  "emergencyContact.*.relationship",
  "El parentesco del contacto de emergencia es obligatorio"
).optional().not()
  .isEmpty(),
check(
  "emergencyContact.*.address",
  "La dirección del contacto de emergencia es obligatoria"
).optional().not().isEmpty(),
validate_fields],
 patientsPUT);

router.delete("/:id",[
  validarJWT,
  validarRolMedicoAdmin,
  validarEstadoPatient,
  check('id', 'El ID no es valido de un paciente').isMongoId(),
  validate_fields], patientsDELETE);

module.exports = router;

