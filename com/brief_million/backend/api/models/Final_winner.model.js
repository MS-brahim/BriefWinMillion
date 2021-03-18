const mongoose = require('mongoose');
const GiftsModel = require('./Gifts.model');
const ParticipantModel = require('./Participant.model');
const RoundModel = require('./Round.model');

const finalWinnerSchema = new mongoose.Schema({
    id_round:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: RoundModel,
        }],
    },
    final_score:{
        type:Number,
    },
    id_participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ParticipantModel
    },
    id_gift:{
        type:mongoose.Schema.Types.ObjectId,
        ref:GiftsModel
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Final_winner', finalWinnerSchema)