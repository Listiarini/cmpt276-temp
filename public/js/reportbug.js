const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'c6024140f3b6106f9ad211128ccb3c17-f7910792-84d22ec5',
        domain: 'sandbox4c1f86d0650547e19406a03339365b27.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const reportBug = (email, subject, descript, callback) => {
    const mailOptions = {
        from: email,
        to: 'notawebappbugreport@gmail.com',
        subject: subject,
        text: descript
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
           callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports = reportBug;
