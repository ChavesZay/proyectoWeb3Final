const { Schema, model } = require('mongoose');


const SchemaPatient = new Schema({
    name: {
        type: String,
        required: [true,"El nombre es obligatorio"]
    },
    lastname: {
        type: String,
        required: [true,"El apellido es obligatorio"]
    },
    dni: {
        type: String,
        required: [true,"La identificación es obligatoria"]
    },
    weight: {
        type: Number,
        required: [true,"El peso es obligatorio"]
    },
    height: {
        type: Number,
        required: [true,"La altura es obligatoria"]
    },
    age: {
        type: Number,
        required: [true,"La edad es obligatoria"]
    },
    diseases: [],
    blood_type: {
        type: String,
        required: [true,"El tipo de sangre es obligatorio"]
    },
    allergies: [],
    emergency_contact: [{
        name: { type: String },
        relationship: { type: String },
        phone: { type: Number },
        address: { type: String }
    }],
    state:{
        type:Boolean,
        default:true
    }
});

module.exports = model('patient', SchemaPatient);