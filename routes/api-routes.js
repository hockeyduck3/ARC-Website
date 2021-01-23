const express = require('express');
const router = express.Router();
const email = require('../utils/email');

router.post('/api/mail', (req, res) => {
    let text;
    let html;

    if (req.body.message === '') {
        text = `${req.body.firstName} did not leave a message. \n But here is ${req.body.firstName}'s email address: ${req.body.email}`;
        html = `<p style="font-size: 15px;">${req.body.firstName} did not leave a message.</p> <br> <p style="font-size: 16px;">But here is ${req.body.firstName}'s email address: ${req.body.email}</p>`;
    } 
    
    else {
        text = `Here is your message from ${req.body.firstName}: \n This is ${req.body.firstName}'s email address: ${req.body.email}`;
        html = `<p style="font-size: 16px;">Here is your message from ${req.body.firstName}:</p> <br> <p style="font-size: 16px;">${req.body.message}</p> <br> <p style="font-size: 14px; margin-top: 10px;">And here is ${req.body.firstName}'s email address: ${req.body.email}</p>`
    }

    email.sendMail({
        from: process.env.user,
        to: process.env.recipient,
        subject: `${req.body.fullName} from the ARC Website.`,
        text: text,
        html: html
    }, (err, info) => {
        if (err) {
            console.log(err);
            res.json(err);
            res.end();
        }

        else {
            res.json(info);
            res.end();
        }
    });
});

module.exports = router;
