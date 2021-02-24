const mongoose = require('mongoose');
const Group_membersModel = require('./Group_members.model');
const QuestionModel = require('./Question.model');
const Question_tokenModel = require('./Question_token.model');

const roundSchema = new mongoose.Schema({
    id_group_member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Group_membersModel
    },
    id_question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:QuestionModel
    },
    id_question_token:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Question_tokenModel
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Round', roundSchema)