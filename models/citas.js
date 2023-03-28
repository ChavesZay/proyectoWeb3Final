const { Schema, model } = require('mongoose');


const SchemaCita = new Schema({
    patient: {
        id: {
             type: String
             },
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        dni: {
            type: String
        },
        weight: {
            type: Number
        },
        height: {
            type: Number
        },
        age: {
            type: Number
        },
        diseases: {
            type: Array
        },
        blood_type: {
            type: String
        },
        allergies: [],
        emergency_contact: [{
            name: { type: String },
            relationship: { type: String },
            phone: { type: Number },
            address: { type: String }
        }],
        state:{
            type:Boolean
        }
    },
    datetime: {
        type: Date,
        require: true
    },
    
    doctor: {
        _id: { type: String },
        name: { type: String },
        user: { type: String },
        speciality: {type: String},
        state: { type: Boolean }
    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = model('cita', SchemaCita);
