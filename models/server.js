const express = require('express');
require('dotenv').config();
const cors = require("cors");
const conectorMONGO = require('../database/mongo');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.citaPath = '/api/appointments';
        this.patientsPath = "/api/patients";
        this.consultPath = '/api/consults';
       
        this.middleWares();
        this.routes();
        this.conectarMongo();

        this.app.set("view engine", "ejs");
        this.app.set("views", __dirname + "/../views");

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.use(this.userPath, require('../routes/users.js'))
        this.app.use(this.citaPath, require('../routes/citas.js'))
        this.app.use(this.authPath, require('../routes/auth.js'))
        this.app.use(this.consultPath, require('../routes/consult.js'))
        this.app.use(this.patientsPath, require('../routes/patients.js'))
    }

    middleWares() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    conectarMongo() {
        conectorMONGO();
    }


}
module.exports = Server;