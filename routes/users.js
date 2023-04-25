const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { validarJWT } = require("../middleware/validateJWT");
const { db_ExistEmail } = require("../helpers/db_validates");
const { validarRolUser } = require('../middleware/validarRoles.js');
const { validarEstadoUser} = require('../middleware/validarEstados.js')




const { usersGET,
    usersPOST,
    usersPUT,
    usersDELETE,
    usersGETById
} = require('../controllers/users');

const router = Router();

router.get("/",[validarJWT,validarRolUser], usersGET);

router.get("/:id", [
    validarJWT,
    validarRolUser,
    check('id', 'El ID no es valido de un usuario').isMongoId(),
    validate_fields],
    usersGETById);


router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Este email no es valido").isEmail(),
        check("password", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Este email no es valido").not().isEmpty(),
        check("email").custom((email) => db_ExistEmail(email)),
        validate_fields,
    ],
    usersPOST
);

router.put("/:id", [
    validarJWT,
    validarRolUser,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields
],
    usersPUT);

router.delete(
    "/:id",
    [
        validarJWT,
        validarRolUser,
        validarEstadoUser,
        check("id", "ID no valido en mongo").isMongoId(),
        validate_fields
    ],

    usersDELETE
);


module.exports = router;