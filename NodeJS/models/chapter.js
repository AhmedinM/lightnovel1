const mongoose = require('mongoose');
var { Novel } = require('../models/novel');

var Chapter = mongoose.model('Chapter',{
    title: {type: String},
    number: {type: Number},
    views: {type: Number},
    novel: {type: mongoose.Schema.Types.ObjectId, ref: Novel},
    text: {type: String},
    datetime: {type: Date}
});

module.exports = {Chapter};