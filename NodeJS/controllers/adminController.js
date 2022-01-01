const express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var { Admin } = require('../models/admin');
const mongoose = require('../db');

var ObjectId = mongoose.Types.ObjectId;

const bcrypt = require('bcrypt')


router.post('/register',(req,res)=>{
    Admin.findOne({email:req.body.email},(err,docs)=>{
        if(!err){
            if(docs!=null){
                res.status(400).send({code: 2});
            }else{
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        var admin = new Admin({
                            email : req.body.email,
                            password : hash
                        });

                        admin.save((err,doc)=>{
                            if(err){
                                console.log('Greska:',JSON.stringify(err,undefined,2));
                            }else{
                                //res.send(doc);
                                console.log("Sacuvano");
                                res.status(200).send();
                            }
                        });
                    });
                });
            }
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/login',(req,res)=>{
    Admin.findOne({email: req.body.email},(err,docs)=>{
        if(err){
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }else{
            if(docs==null){
                res.status(400).send({code: 1});
            }else{
                bcrypt.compare(req.body.password, docs.password,(err,r)=>{
                    if(err){
                        console.log('Greska:',JSON.stringify(err,undefined,2));
                    }else{
                        if(r){
                            let payload = {subject: docs._id, type: "admin"};
                            let token = jwt.sign(payload,'encryption123');
                            res.status(200).send({token});
                        }else{
                            res.status(400).send({code: 2});
                        }
                    }      
                });
            }
        }
    });
});

router.post('/password',(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            Admin.updateOne({_id: req.body.id},{$set: {password: hash}},(err,doc)=>{
                if(err){
                    console.log('Greska:',JSON.stringify(err,undefined,2));
                }else{
                    res.status(200).send({msg: 'ok'});
                }
            });
        });
    });
});

router.delete('/delete',(req,res)=>{
    let id = req.query.id;
    Admin.deleteOne({_id: id},(err,docs)=>{
        if(!err){
            res.status(200).send({code: "ok"});
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

module.exports = router;