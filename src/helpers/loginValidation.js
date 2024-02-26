const { check } = require('express-validator');


const loginValidation = [
    check('email', 'Inavalid Email').isEmail().normalizeEmail({
        gmail_lowercase : true,
        gmail_remove_dots : false
       }),
    check('password', 'Password must contain minimum 8 characters').isLength({ min : 8 })
];

module.exports = loginValidation;