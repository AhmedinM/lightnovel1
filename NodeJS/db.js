const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lightnovel',(err)=>{
    if(!err){
        console.log('Uspjesno povezano!');
    }else{
        console.log('Greska:',JSON.stringify(err,undefined,2));
    }
});

module.exports = mongoose;