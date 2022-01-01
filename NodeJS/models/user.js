const mongoose = require('mongoose');

var User = mongoose.model('User',{
    username: {type: String},
    email: {type: String},
    password: {type: String},
    picture: {type: String},
    datetime: {type: Date}
});
//},'users'); - stavlja samo, a mi stavljamo ako je mnogo drugacije

module.exports = {User};