const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    price: {type: Number}
})

const product = mongoose.model("product", schema);

module.exports = product