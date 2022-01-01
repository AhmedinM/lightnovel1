const express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var { User } = require('../models/user');
var { Comment } = require('../models/comment');
var { Review } = require('../models/review');
var { Follow } = require('../models/follow');

const mongoose = require('../db');

var ObjectId = mongoose.Types.ObjectId;

const bcrypt = require('bcrypt')

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../AngularApp/src/assets/img/');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

//=> localhost:3000/users/list
router.get('/all',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    }).sort({"username": 1});
});

router.get('/one',(req,res)=>{
    let id = req.query.id;
    console.log(id);
    User.findById(id,(err,docs)=>{
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
            res.status(404).send();
        }
    });
});

router.post('/register', upload.single('file'), (req,res)=>{
    console.log(req.body);
    console.log("fajl");
    console.log(req.body.file);

    User.findOne({username: req.body.username},(err,docs)=>{
        if(!err){
            if(docs!=null){
                res.status(400).send({code: 1});
            }else{
                User.findOne({email: req.body.email},(err,docs)=>{
                    if(!err){
                        if(docs!=null){
                            res.status(400).send({code: 2});
                        }else{
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(req.body.password, salt, function(err, hash) {
                                    console.log(hash);
                                    
                                    //upload.single(req.body.file);
                                    var user = new User({
                                        username : req.body.username,
                                        email : req.body.email,
                                        password : hash,
                                        picture: '../../assets/img/' + req.file.filename
                                    });

                                    user.save((err,doc)=>{
                                        if(err){
                                            console.log('Greska:',JSON.stringify(err,undefined,2));
                                        }else{
                                            //res.send(doc);
                                            console.log("Sacuvano");
                                            let payload = {subject: doc._id, name: doc.username, type: "user"};
                                            let token = jwt.sign(payload,'encryption123');
                                            console.log(token);
                                            res.status(200).send({token});
                                        }
                                    });
                                });
                            });
                        }
                    }else{
                        console.log('Greska:',JSON.stringify(err,undefined,2));
                    }
                });
            }
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/update',(req,res)=>{
    User.findOne({username: req.body.username, email:req.body.email},(err,docs)=>{
        if(!err){
            if(docs!=null){
                res.status(400).send({code: 3});
            }else{
                User.updateOne({_id: req.body.id},{$set: {username: req.body.username, email: req.body.email}},(err,doc)=>{
                    if(err){
                        console.log('Greska:',JSON.stringify(err,undefined,2));
                    }else{
                        res.status(200).send({msg: "ok"});
                    }
                });
            }
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/password',(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            User.updateOne({_id: req.body.id},{$set: {password: hash}},(err,doc)=>{
                if(err){
                    console.log('Greska:',JSON.stringify(err,undefined,2));
                }else{
                    res.status(200).send({msg: 'ok'});
                }
            });
        });
    });
});

router.post('/upload', upload.single('file'), (req,res)=>{
    User.updateOne({_id: req.body.id},{$set: {picture: '../../assets/img/' + req.file.filename}},(err,doc)=>{
        if(err){
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }else{
            res.status(200).send({msg: 'ok'});
        }
    });
});

router.post('/login',(req,res)=>{
    console.log(req.body);
    
    User.findOne({email: req.body.email},(err,docs)=>{
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
                            let payload = {subject: docs._id, name: docs.username, type: "user"};
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

router.delete('/delete',(req,res)=>{
    let id = req.query.id;
    Review.deleteMany({user: id},(err,docs)=>{
        if(!err){
            Comment.deleteMany({user: id},(err,docs)=>{
                if(!err){
                    User.deleteOne({_id: id},(err,docs)=>{
                        if(!err){
                            res.status(200).send({code: "ok"});
                        }else{
                            console.log('Greska:',JSON.stringify(err,undefined,2));
                        }
                    });
                }else{
                    console.log('Greska:',JSON.stringify(err,undefined,2));
                }
            });
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/onefollow', (req,res)=>{
    console.log("FOLLOW");
    console.log(req.query.user);
    console.log(req.query.novel);
    Follow.findOne({user: req.query.user, novel:req.query.novel},(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/one-follow', (req,res)=>{
    let u = req.body.user;
    let n = req.body.novel;

    var follow = new Follow({
        user: u,
        novel: n
    });
    follow.save((err,doc)=>{
        if(!err){
            res.status(200).send({code: "ok"});
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
      })
});

router.delete('/follow',(req,res)=>{
    let id = req.query.id;
    Follow.deleteOne({_id: id},(err,docs)=>{
        if(!err){
            res.status(200).send({code: "ok"});
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

module.exports = router;