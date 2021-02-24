const mongoose = require('mongoose');
const RoundModel = require('./Round.model');

const round_score_statisticSchema = new mongoose.Schema({
    id_round:{
        type:mongoose.Schema.Types.ObjectId,
        ref:RoundModel
    },
    score:{
        type:Number,
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Round_score_statistic', round_score_statisticSchema)