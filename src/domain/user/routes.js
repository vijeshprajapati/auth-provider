const express = require('express');
const signUpValidation = require('../../helpers/signupValidation');
const loginValidation = require('../../helpers/loginValidation');
const { createNewUser, userLogin} = require('./controller');
const { validationResult } = require('express-validator');
const router = express.Router();

router.post('/login', loginValidation, async(req, res) => {
    try {
        let { email, password } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const authenticatedUser = await userLogin({ email, password});
        // res.status(200).json(authenticatedUser);

        res.render(__dirname + '\\login.ejs', {
            user : authenticatedUser
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/signup', signUpValidation, async(req, res) => {

    try {
        let { firstName, lastName, age, email, password } = req.body;
        firstName.trim();   
        lastName.trim();
        email.trim();
        password.trim();

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const newUser = await createNewUser({
            firstName,
            lastName,
            age,
            email,
            password
        });

        res.status(200).json(newUser);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;