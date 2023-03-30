const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { usersGET,
    usersPOST,
    usersPUT,
    usersDELETE
} = require('../controllers/users');

const router = Router();

router.get('/', usersGET);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Este email no es valido').isEmail(),
    check('password', 'El nombre es obligatorio').not().isEmpty(),
    validate_fields], usersPOST);

router.put('/:id',
    [
        check('id', 'ID no es valido de mongo').isMongoId(),
        validate_fields
    ], usersPUT);

router.delete('/:id',
    [
        check('id', 'ID no es valido de mongo').isMongoId(),
        validate_fields
    ],
    usersDELETE);

module.exports = router;