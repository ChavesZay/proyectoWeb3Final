const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { validarJWT } = require("../middleware/validateJWT");
const { db_ExistEmail } = require("../helpers/db_validates");

const { usersGET,
    usersPOST,
    usersPUT,
    usersDELETE,
    usersGETPOST
} = require('../controllers/users');

const router = Router();

router.get("/", usersGETPOST);
router.get("/usuarios", usersGET);

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
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields
],
    usersPUT);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "ID no valido en mongo").isMongoId(),
        validate_fields,
    ],

    usersDELETE
);


module.exports = router;