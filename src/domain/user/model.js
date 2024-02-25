const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : String,
    lastName :String,
    age: Number,
    email : { type : String, unique: true },
    password : String,
    token : String
});

const User = mongoose.model('User', userSchema);

module.exports = User;