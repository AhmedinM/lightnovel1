const express = require('express');
var router = express.Router();

var { Chapter } = require('../models/chapter');
var { Novel } = require('../models/novel');
var { Comment } = require('../models/comment');

const mongoose = require('../db');
var ObjectId = mongoose.Types.ObjectId;

//  Poglavlja
router.get('/one',(req,res)=>{
    var id = req.query.id;
    Chapter.findById(id,(err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
            res.status(404).send();
        }
    });
});

router.post('/view',(req,res)=>{
    var id = req.body.id;
    console.log("id je: "+id);
    Chapter.findById(id,(err,docs)=>{
        if(!err){
            let v = docs.views+1;
            console.log("v: "+v);
            Chapter.updateOne({_id: id}, {$set: {views: v}}, function(errd, resd) {
                if(!errd){
                    res.status(200).send();
                }else{
                    console.log('Greska:',JSON.stringify(errd,undefined,2));
                }
              });
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/insert', (req,res)=>{
    var chapter = new Chapter({
        title : req.body.title,
        number : req.body.number,
        text : req.body.text,
        views : 0,
        novel: req.body.novel,
        datetime: req.body.datetime
    });

    chapter.save((err,doc)=>{
        if(err){
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }else{
            res.status(200).send();
        }
    });
});

router.delete('/delete',(req,res)=>{
    let id = req.query.id;
    Comment.deleteMany({chapter: id},(err,docs)=>{
        if(!err){
            Chapter.deleteOne({_id: id},(err,docs)=>{
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
});

//  Komentari
router.get('/comments',(req,res)=>{
    var id = req.query.id;
    Comment.find({chapter: id}).populate({
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

router.post('/comment',(req,res)=>{
    let chapterO = ObjectId(req.body.chapter);
    let userO = ObjectId(req.body.user);
    var comment = new Comment({
        text: req.body.text,
        chapter: chapterO,
        user: userO,
        datetime: req.body.datetime
    });
    console.log(comment);
    comment.save((err,doc)=>{
        if(err){
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }else{
            res.status(200).send({msg: "ok"});
        }
    });
});

router.delete('/comment',(req,res)=>{
    let id = req.query.id;
    Comment.deleteOne({_id: id},(err,docs)=>{
        if(!err){
            res.status(200).send({code: "ok"});
        }else{
            console.log('Greska:',JSON.stringify(err,undefined,2));
        }
    });
});

module.exports = router;