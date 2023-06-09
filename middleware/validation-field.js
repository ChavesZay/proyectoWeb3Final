const { validationResult } = require('express-validator');

const validate_fields= async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();

}

module.exports={
    validate_fields  
}
