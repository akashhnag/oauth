const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema1 = new Schema({
    username: String,
    googleID: String,
})

const User1 = mongoose.model('googleuser', userSchema1)

const userSchema2 = new Schema({
    username: String,
    githubID: String,
})

const User2 = mongoose.model('githubuser', userSchema2)

module.exports = { User1, User2 };
