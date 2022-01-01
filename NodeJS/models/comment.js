const mongoose = require('mongoose');

var { Chapter } = require('../models/chapter');
var { User } = require('../models/user');

var Comment = mongoose.model('Comment',{
    text: {type: String},
    chapter: {type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    datetime: {type: Date}
});

module.exports = {Comment};