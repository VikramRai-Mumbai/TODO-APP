const { timeStamp } = require("console");
const mongoose = require("mongoose");

const TODO = mongoose.model(
    "TODO",
    new mongoose.Schema({
        username: {
            type:String,
            trim:true,
            lowercase:true,
            required: true,
            minlength:3, 
            maxlength:100 
        },
        title: {
            type:String, 
            trim:true,
            lowercase:true,
            required: true,
            minlength:3, 
            maxlength:100
        },
        status: {
            type:String,
            trim:true,
            required: true,
            lowercase:true,
            enum: ["active", "in-progress", "completed", "deleted"]
        },
        category: {
            type:String,
            trim:true,
            required: true,
            lowercase:true,
            enum: ["work", "hobby", "task", "other"]
        },
        deletedAt : {type: Date},
        completedAt : {type: Date}

    }, {timestamps: true})
);

module.exports = TODO;