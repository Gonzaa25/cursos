// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const sgtransport = require('nodemailer-sendgrid-transport');


let mailConfig;
if (process.env.NODE_ENV == 'production') {
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    mailConfig = sgtransport(options);
} else {
    if (process.env.NODE_ENV == 'staging') {
        console.log('XXXXXXXXXXXXX');
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET
            }
        }
        mailConfig = sgtransport(options);
    } else {
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.etherial_user,
                pass: process.env.etherial_password
            },
            tls: {
                rejectUnauthorized: false
            }
        };
    }
}


module.exports = nodemailer.createTransport(mailConfig);