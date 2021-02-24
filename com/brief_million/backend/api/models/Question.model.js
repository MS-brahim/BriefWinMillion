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
    false_choices:{
        type:{
            choice1:String,
            choice2:String,
            choice3:String
        },
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Question', questionSchema)