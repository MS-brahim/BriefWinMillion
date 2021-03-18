const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        min:10
    },
    answer:{
        type:String,
        required:true,
    },
    false_choice1:{
        type:String,
        required:true,
    },
    false_choice2:{
        type:String,
        required:true,
    },
    false_choice3:{
        type:String,
        required:true,
    },
    points:{
        type:Number,
        required:true,
        default:5
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Question', questionSchema)