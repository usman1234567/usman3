function test(){
    "use strict";
    let a = 1;
} 

const mongoose = require ('mongoose');
require('dotenv').config();

mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/myapp')

//mongoose.connect('mongodb://nodejsuser:ngnware321@ds263640.mlab.com:63640/nodejs-tuts')

//console.log(process.env.MONGOURI)

//mongoose.connect('mongodb://usman321:ngnware321@ds263640.mlab.com:63640/nodejs-tuts');