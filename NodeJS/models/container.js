const mongoose = require('mongoose');

var { User } = require('../models/user');
var { Chapter } = require('../models/chapter');

var Container = mongoose.model('Container',{
    user: {type: mongoose.Schema.Types.ObjectId, ref: User},
    chapter: {type: mongoose.Schema.Types.ObjectId, ref: Chapter},
    datetime: {type: Date}
});

module.exports = {Container};