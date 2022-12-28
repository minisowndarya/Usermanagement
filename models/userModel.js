const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    middleName: {
        required: false,
        type: String
    },
    emailAddress: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: Number

    },
    password: {
        required:true,
        type:String
    }
});


module.exports = mongoose.model('UserModel', userSchema);