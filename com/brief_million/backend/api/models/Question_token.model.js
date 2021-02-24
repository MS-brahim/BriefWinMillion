const mongoose = require('mongoose');
const ParticipantModel = require('./Participant.model');
const QuestionModel = require('./Question.model');

const questionTokenSchema = new mongoose.Schema({
    id_question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:QuestionModel
    },
    participant_answer:{
        type:String,
        required:true,
    },
    id_participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ParticipantModel
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Question_token', questionTokenSchema)