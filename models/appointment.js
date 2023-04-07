const { Schema, model } = require('mongoose');

const SchemaAppointment= new Schema({
    patient: {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    datetime: {
        type: Date,
        require: true
    },
    doctor: {
        _id: { type: String },
        name: { type: String },
        speciality: {type: String}
    },
    state: {
        type: Boolean,
        default: true
    },
    user:{
        type: String,
        required: true
    }
});

module.exports = model('appointment', SchemaAppointment);
