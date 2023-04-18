const {Router}=require('express');

const { check } = require("express-validator");
const { validate_fields } = require("../middleware/validation-field");


const router=Router();

const {login,  googleSingIn} =require('../controllers/auth.js');



router.post(
    "/login",
    [
      check("email", "Debe enviar un email valido").isEmail(),
      check("password", "Debe enviar una contraseña").not().isEmpty(),
      validate_fields,
    ],
    login
  );


router.post(
    "/google",
    [
      check("id_token", "El id_token es necesario").not().isEmpty(),
      validate_fields,
    ],
    googleSingIn
  );


module.exports=router;




