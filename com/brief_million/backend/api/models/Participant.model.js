const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required:true,
        min:4
    },
    email:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    is_valid:{
        type:Boolean,
        required:true,
        default:false
    },
    online:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Participant', participantSchema)