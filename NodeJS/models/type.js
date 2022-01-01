const mongoose = require('mongoose');
var { Novel } = require('../models/novel');
var { Genre } = require('../models/genre');

var Type = mongoose.model('Type',{
    novel: {type: mongoose.Schema.Types.ObjectId, ref: Novel},
    genre: {type: mongoose.Schema.Types.ObjectId, ref: Genre}
});

module.exports = {Type};