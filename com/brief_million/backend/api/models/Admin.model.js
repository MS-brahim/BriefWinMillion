const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required:true,
        min:4
    },
    phone:{
        type:String,
        required:true,
        unique:true
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

module.exports = mongoose.model('Admin', adminSchema)