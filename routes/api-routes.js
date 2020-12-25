const express = require('express');
const router = express.Router();
const email = require('./email');

router.post('/api/mail', (req, res) => {
    email.sendMail({
        from: process.env.user,
        to: process.env.recipient,
        subject: `New Message from ${req.body.name} on the ARC Website!`,
        text: req.body.message,
        html: `<p>${req.body.message}</p>`
    }, (err, info) => {
        if (err) {
            console.log(err);
        }

        else {
            console.log(`Message sent, ${info.response}`)
        }
    });
});

module.exports = router;
