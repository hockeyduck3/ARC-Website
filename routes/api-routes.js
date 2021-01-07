const express = require('express');
const router = express.Router();
const email = require('../utils/email');

router.post('/api/mail', (req, res) => {
    email.sendMail({
        from: process.env.user,
        to: process.env.recipient,
        subject: `${req.body.fullName} from the ARC Website.`,
        text: `${req.body.message}, \n ${req.body.firstName}'s email address is: ${req.body.email}`,
        html: `<p>${req.body.message}</p> <br> <p>${req.body.firstName}'s email address is: ${req.body.email}</p> `
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
