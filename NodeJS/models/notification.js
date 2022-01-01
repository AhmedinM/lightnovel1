const mongoose = require('mongoose');

var Notification = mongoose.model('Notification',{
    follow: {type: mongoose.Schema.Types.ObjectId, ref: 'Follow'},
    datetime: {type: Date}
});

module.exports = {Notification};