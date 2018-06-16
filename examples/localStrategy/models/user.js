const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
    password: String
});

// passport-local-mongoose package automatically takes care of 
// salting and hashing the password 
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);