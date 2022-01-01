const mongoose = require('mongoose');

var Novel = mongoose.model('Novel',{
    title: {type: String},
    author: {type: String},
    picture: {type: String},
    description: {type: String},
    status: {type: Boolean},
    datetime: {type: Date}
});

module.exports = {Novel};