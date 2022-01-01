const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db.js');

var userController = require('./controllers/userController.js');
var novelController = require('./controllers/novelController.js');
var chapterController = require('./controllers/chapterController.js');
var adminController = require('./controllers/adminController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, ()=>{
    console.log('Server pokrenut na portu: 3000!');
});

app.use('/users', userController);
app.use('/novels', novelController);
app.use('/chapters', chapterController);
app.use('/admin', adminController);