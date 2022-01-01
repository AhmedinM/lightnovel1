const mongoose = require('mongoose');

var Admin = mongoose.model('Admin',{
    email: {type: String},
    password: {type: String},
    datetime: {type: Date}
});

module.exports = {Admin};