const express = require('express');
var router = express.Router();

var { Novel } = require('../models/novel');
var { Type } = require('../models/type');
var { Review } = require('../models/review');
var { User } = require('../models/user');
var { Chapter } = require('../models/chapter');
var { Type } = require('../models/type');
var { Genre } = require('../models/genre');
var { Follow } = require('../models/follow');

const mongoose = require('../db');

var ObjectId = mongoose.Types.ObjectId;

var multer  = require('multer');
const { now } = require('mongoose');

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

//  Romani
router.get('/random',(req,res)=>{
    Novel.aggregate([{ $sample: { size: 5 } }], (err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/new',(req,res)=>{
    Novel.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    }).sort({"datetime": -1}).limit(5);
});

router.get('/one',(req,res)=>{
    let id = req.query.id;
    console.log(id);
    Novel.findById(id,(err,docs)=>{
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
            res.status(404).send();
        }
    });
});

router.get('/all',(req,res)=>{
    Novel.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    }).sort({"title": 1});
});

router.delete('/delete',(req,res)=>{
    let id = req.query.id;
    Review.deleteMany({novel: id},(err,docs)=>{
        if(!err){
            Chapter.deleteMany({novel: id},(err,docs)=>{
                if(!err){
                    Novel.deleteOne({_id: id},(err,docs)=>{
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

router.post('/insert', upload.single('file'), (req,res)=>{
    Novel.findOne({title: req.body.title},(err,docs)=>{
        if(!err){
            if(docs!=null){
                res.status(400).send({code: 1});
            }else{
                var novel = new Novel({
                    title : req.body.title,
                    author : req.body.author,
                    description : req.body.description,
                    status : 0,
                    picture: '../../assets/img/' + req.file.filename,
                    datetime: req.body.datetime
                });

                novel.save((err,doc)=>{
                    if(err){
                        console.log('Greska:',JSON.stringify(err,undefined,2));
                    }else{
                        let dat = req.body.genres.split(',');
                        for(let i=0;i<dat.length;i++){
                            console.log("GENRE I");
                            console.log(dat.length);
                            let p = dat[i];
                            var gen = new Type({
                                novel: doc._id,
                                genre: p
                            });
                            console.log("GENRE");
                            console.log(gen);
                            gen.save((err,docG)=>{
                                if(err){
                                    console.log(err);
                                }
                            })
                        }
                        res.status(200).send();
                    }
                });
            }
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/check', (req, res)=>{
    Novel.updateOne({_id: req.body.id},{$set: {status: true}},(err,doc)=>{
        if(err){
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }else{
            res.status(200).send({msg: 'ok'});
        }
    });
});

//  Recenzije
router.post('/review',(req,res)=>{
    Review.deleteMany({novel: req.body.novel, user: req.body.user},(err,docs)=>{
        if(!err){
            let novelO = ObjectId(req.body.novel);
            let userO = ObjectId(req.body.user);
            var review = new Review({
                title : req.body.title,
                text : req.body.text,
                mark : req.body.mark,
                novel: novelO,
                user: userO,
                datetime: req.body.datetime
            });
            //console.log(review);
            review.save((err,doc)=>{
                if(err){
                    //console.log('Greska:',JSON.stringify(err,undefined,2));
                    console.log(err);
                }else{
                    res.status(200).send({msg: "ok"});
                }
            });
        }
    })
});

router.get('/reviews',(req,res)=>{
    let id = req.query.id;
    Review.find({novel: id}).sort({"datetime": -1}).populate({
        path: 'user',
        model: 'User'
    }).exec((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.delete('/review',(req,res)=>{
    let id = req.query.id;
    Review.deleteOne({_id: id},(err,docs)=>{
        if(!err){
            res.status(200).send({code: "ok"});
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/best',(req,res)=>{
    Review.find().sort({"mark": -1}).limit(5).populate({
        path: 'novel',
        model: 'Novel'
    }).exec((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

//  Poglavlja i zanrovi
router.get('/chapters',(req,res)=>{
    let id = req.query.id;
    Chapter.find({novel: id},(err,docs)=>{
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    }).sort({"number": 1});
});

router.get('/popular',(req,res)=>{
    Chapter.find().sort({"views": -1}).limit(5).populate({
        path: 'novel',
        model: 'Novel'
    }).exec((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/genres',(req,res)=>{
    let id = req.query.id;
    Type.find({novel: id}).populate({
        path: 'genre',
        model: 'Genre'
    }).exec((err,docs)=>{
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/all-genres',(req,res)=>{
    Genre.find((err,docs)=>{
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    }).sort({"name": 1});
});

router.delete('/genre',(req,res)=>{
    let id = req.query.id;
    Genre.deleteOne({_id: id},(err,docs)=>{
        if(!err){
            res.status(200).send({code: "ok"});
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/genre',(req,res)=>{
    Genre.findOne({name:req.body.name},(err,docs)=>{
        if(!err){
            if(docs!=null){
                res.status(400).send({code: 2});
            }else{
                var genre = new Genre({
                    name: req.body.name
                });
                genre.save((err,doc)=>{
                    if(err){
                        console.log('Greska:',JSON.stringify(err,undefined,2));
                    }else{
                        res.status(200).send();
                    }
                });

            }
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

//  Pracenja

router.get('/follows', (req,res)=>{
    console.log("POZIVAAA");
    let id = req.query.user;
    Follow.find({user: id}).populate({
        path: 'novel',
        model: 'Novel'
    }).exec((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

//  Pretraga

router.get('/search', (req,res)=>{
    //let key = req.query.title;
    Novel.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    }).sort({title: 1});
});

router.get('/chapter-search', (req,res)=>{
    //let key = req.query.title;
    Chapter.find().sort({title: 1}).populate({
        path: 'novel',
        model: 'Novel'
    }).exec((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

module.exports = router;