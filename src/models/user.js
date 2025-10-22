// Schema matlab humara data kaisa hoga usme kya kya fields honge wo sab define karna

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type:String,
    },
    lastName : { 
        type:String,
    },
    emailId : {
        type:String,
    },
    password : {
        type:String,
    },
    age : {
        type:Number,
    },
    gender : {
        type:String,
    },
});

// Creating a mongoDB model and exporting it
const USER = mongoose.model("user",userSchema)
module.exports = USER;

