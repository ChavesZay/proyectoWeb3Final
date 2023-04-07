const {Schema,model}=require('mongoose');


const SchemaDoctor= new Schema({
name:{
    type:String,
    required:[true,'El campo name es requerido']
},

user:{
    type:String,
    required:[true,'El campo user es requerido']
},

speciality:{
    type:String,
    default:"Medicina General"
},
state:{
    type:Boolean,
    default:true
}

});

module.exports=model('doctor',SchemaDoctor);