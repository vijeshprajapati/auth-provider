const hashData = require('../../util/hashData');
const User = require('./model')

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

module.exports = { createNewUser };