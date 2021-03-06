const mongoose = require('mongoose');
const ParticipantModel = require('./Participant.model');

const groupMemberSchema = new mongoose.Schema({
    id_participant:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: ParticipantModel,
        }],

        validate: [groupLimit, '{PATH} exceeds the limit of 4']

    },
    group_code:{
        type:Number,
        required:true,
        // unique:true
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

function groupLimit(val) {
    return val.length <= 4;
}

module.exports = mongoose.model('Group_member', groupMemberSchema)