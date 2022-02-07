const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    fullname: {type: String},
    email: {type: String},
    age: {type: Number},
    description: {type: String},
})

const user = mongoose.model("user", schema);

module.exports = user