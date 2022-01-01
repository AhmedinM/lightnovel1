const mongoose = require('mongoose');

var { Novel } = require('../models/novel');
var { User } = require('../models/user');

var Follow = mongoose.model('Follow',{
    novel: {type: mongoose.Schema.Types.ObjectId, ref: Novel},
    user: {type: mongoose.Schema.Types.ObjectId, ref: User}
});

module.exports = {Follow};