const {Router}=require('express');

const router=Router();

const {login, loginView} =require('../controllers/auth.js');

router.get("/IniciarSesion", loginView);

router.post("/login",login);

module.exports=router;




