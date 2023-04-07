const {Schema,model}=require('mongoose');


const SchemaUsuario= new Schema({
name:{
    type:String,
    required:[true,'El campo nombre es requerido']
},

password:{
    type:String,
    required:[true,'El campo password es requerido']
},

email:{
    type:String,
    required:[true,'El campo email es requerido']
},

google:{
    type:Boolean,
    default:false
},

role:{
    type:String,
    default:"public",
},
state:{
    type:Boolean,
    default:true
}

});

module.exports=model('user',SchemaUsuario);