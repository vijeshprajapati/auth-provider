const express = require('express');
const signUpValidation = require('../../helpers/signupValidation');
const { createNewUser } = require('./controller');
const { validationResult } = require('express-validator');
const router = express.Router();

router.post('/signup', signUpValidation, async(req, res) => {

    try {
        let { firstName, lastName, age, email, password } = req.body;
        firstName.trim();   
        lastName.trim();
        email.trim();
        password.trim();

        const errors = validationResult(firstName, lastName, email, password);
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