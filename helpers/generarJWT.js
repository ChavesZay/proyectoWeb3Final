const jwt = require('jsonwebtoken');

const generarJWT = (id = '') => {
    //return new Promise(resolve, reject);
    return new Promise(
        (resolve, reject) => {
            const payload={id};

           const options={
            expiresIn:'4h'
           }
           //firmamos el token
            jwt.sign(payload,process.env.SECRETORPRIVATEKEY,options,(err, token)=>{
                if(err){
                    reject('No se pudo generar el token');
                }else{
                    resolve(token);
                }
            })
        }
    )
}

module.exports= generarJWT;