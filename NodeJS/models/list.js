const mongoose = require('mongoose');

var List = mongoose.model('List',{
    name: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    datetime: {type: Date}
});

module.exports = {List};