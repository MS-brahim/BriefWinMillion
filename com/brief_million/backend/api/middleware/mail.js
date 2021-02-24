const nodemailer = require('nodemailer');
require('dotenv').config()

const sendMail = async (to) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_USER_MAIL,
            pass: process.env.AUTH_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.AUTH_USER_MAIL, // sender address
        to: to, // list of receivers
        subject: 'Your compte has actived', // Subject line
        html: '<p>Your html here</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = {sendMail}
