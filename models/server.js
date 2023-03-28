const express = require('express');
require('dotenv').config();
const conectorMONGO = require('../database/mongo');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.citaPath = '/api/citas';

       
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