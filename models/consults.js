const { Schema, model } = require('mongoose');

const SchemaConsult = new Schema({
    patient: {
        name: {
            type: String,
            required: true
        },
        dni: {
            type: String,
            required: true
        }
    },
    height: {
        type: String,
        required: [true, "La altura es obligatoria"]
    },
    symptoms: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: [true, "El peso es obligatoria"]

    },
    pressure: {
        type: Number,
        required: [true, "La presión es obligatoria"]
    },
    diagnosis: {
        type: String,
        default:""
    },
    medicines: {
        type: Array,
        default:[]
    },
    test:[
        {
            testCategory: {
                type: String,
                default:""

            },
            testType: {
                type: Array,
                default:null
            }
        }
    ],
    state:{
        type: Boolean,
        default:true
    },
    date:{
        type:Date,
        default: Date.now
    }

});

module.exports = model('consult', SchemaConsult);
