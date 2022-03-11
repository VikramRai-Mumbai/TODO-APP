 
const mongoose = require("mongoose");
const validator=require('validator');

const User = mongoose.model(  
    "User",
    new mongoose.Schema({
        username: {
            type:String,
            required:true,
            trim:true,
            minlength:5,
            maxlength:100,
              },
        email: {
            type:String,
            required:true,
            trim:true,
            minlength:5,
            maxlength:100,
            unique:true,
            validate(value){ 
                if(!validator.isEmail(value)){
                     throw new Error("email is invalid"); 
                }
            }
              },
        mobile: {
            type:Number,
            trim:true,
            minlength:10,
            maxlength:10,
            unique:true
            },
        role: {
            type:String,
            trim: true,
            required: true,
            lowercase:true,
            enum: ["admin", "user"]
            }
       
    },{ timestamps: true})
);

module.exports = User; 