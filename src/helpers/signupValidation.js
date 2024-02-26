const { check } = require('express-validator');

const signUpValidation = [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail().normalizeEmail({
         gmail_lowercase : true,
         gmail_remove_dots : false
        }),
    check('password', 'Password must contain minimum 8 characters').isLength({ min : 8 })
];

module.exports = signUpValidation;