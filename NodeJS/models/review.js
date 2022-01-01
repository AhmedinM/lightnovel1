const mongoose = require('mongoose');
var { User } = require('../models/user');
var { Novel } = require('../models/novel');

var Review = mongoose.model('Review',{
    title: {type: String},
    text: {type: String},
    mark: {type: Number},
    novel: {type: mongoose.Schema.Types.ObjectId, ref: Novel},
    user: {type: mongoose.Schema.Types.ObjectId, ref: User},
    datetime: {type: Date}
});

module.exports = {Review};