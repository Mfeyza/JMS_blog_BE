"use strict"


const nodemailer = require('nodemailer')
module.exports = function (to, subject, message) {

    return true

    const mailSettings = {
        service: 'Gmail',
        user: 'username@gmail.com',
        pass: 'password'
    }
    const transporter = nodemailer.createTransport({
        service: mailSettings.service,
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass,
        }
    })
    transporter.sendMail({
        from: mailSettings.user,
        to: to,
        subject: subject,
        text: message,
        html: message,
    }, (error, info) => {
        error ? console.log(error) : console.log(info)
    })
}