// Schema matlab humara data kaisa hoga usme kya kya fields honge wo sab define karna

const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
        trim:true,
    },

    lastName : { 
        type:String,
        minLength:2,
        maxLength:50,
        trim:true,
    },

    emailId : {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address "+ value);
            }
        }  
    },

    password : {
        type:String,
        required:true,
        minLength:8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password");
            }
        }
    },

    age : {
        type:Number,
        min:18,
    },

    gender : {
        type:String,
        enum:['male','female','other'],
    },

    photoUrl : {
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL "+ value);
            }
        }
    },

    about : {
        type:String,
        default:"This is a default description about the user",
        maxLength:200,
    },

    skills : {
        type:[String],
    }
},
{
    timestamps:true
});

// Creating a mongoDB model and exporting it
const USER = mongoose.model("user",userSchema)
module.exports = USER;

