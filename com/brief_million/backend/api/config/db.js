const mongoose = require('mongoose');
require('dotenv').config();

function connect(){
    return new Promise((resolve,reject) => {
        mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser : true,useCreateIndex : true,useUnifiedTopology: true})
        .then((res,err) => {
            if(err) return reject(err);
            resolve();
        })
    })
}

function close(){
    return mongoose.disconnect();
}

module.exports = { connect,close};