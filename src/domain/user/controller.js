const hashData = require('../../util/hashData');
const User = require('./model');
const bcrypt = require('bcrypt');
const createToken = require('../../util/createToken');

const userLogin = async(data) => {
    try {
        const { email, password } = data;

        const findUser = await User.findOne({ email });
        if(!findUser){
            throw Error("User doesn't exists");
        }

        const hashedPassword = findUser.password;
        const match = await bcrypt.compare(password, hashedPassword);
        
        if(!match){
            throw Error("Incorrect Password");
        }

        const tokenData = { userId : findUser._id, email };
        const token = await createToken(tokenData);

        findUser.token = token;
        return findUser;

    } catch (error) {
        throw error;
    }
}

const createNewUser = async(data) => {
    try {
        const { firstName, lastName, age, email, password } = data;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw Error("User already exists");
        }

        const hashedPassword = await hashData(password);
        const newUser = new User({
            firstName,
            lastName,
            age,
            email,
            password : hashedPassword
        });

        const createdUser = await newUser.save();
        return createdUser;

    } catch (error) {
        throw error;
    }
}

module.exports = { createNewUser , userLogin};