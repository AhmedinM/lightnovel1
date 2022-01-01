const mongoose = require('mongoose');

var Genre = mongoose.model('Genre',{
    name: {type: String},
    datetime: {type: Date}
});

module.exports = {Genre};