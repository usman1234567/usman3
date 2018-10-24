const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');
const morgan = require('morgan');
var db = monk('localhost:27017/myapp');
// mongoose connection

require("./mongo");


//models
require('./model/post');
require('./model/user');


app.use(bodyparser.json())
   .use(morgan())



app.use(function(req,res,next){
	req.db = db;
	next();
});


const post = mongoose.model('post');

/*app.get('/posts',async(req,res)=>{
	try{
		const posts = await post.find({})
		res.send(posts)
	}catch(error){
		res.status(500)
	}
});*/
app.get('/posts/:postid', function(req, res) {
  var db = req.db;
  var collection = db.get('posts');
  collection.findOne({},{},function(e,docs){
    res.json(docs);
  });
});

app.put('/posts/:postid', function(req, res) {
  var db = req.db;
  var collection = db.get('posts');
  collection.findByIdAndUpdate('5b320e3dcca7f9d848b02091',req.body ,{
  	new: true
   
  },function(e,docs){
    res.json(docs);
  });
});

	app.get('/posts', function(req, res) {
  var db = req.db;
  var collection = db.get('posts');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});



app.get('/users', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to adduser. */
app.post('/posts', function(req, res) {
  var db = req.db;
  var collection = db.get('posts');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});


/* POST to adduser. */
app.post('/users', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});



app.listen(3001, function(){
	console.log("server runing on 3001")
});
module.exports = app;