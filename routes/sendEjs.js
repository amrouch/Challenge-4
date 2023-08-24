const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

router.post('/send-ejs', async (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    ejs.renderFile(path.join(__dirname, '../views/emailTemplate.ejs'), { message }, (err, html) => {
        if (err) {
            console.error('Error rendering EJS template:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to,
            subject,
            html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                return res.status(500).json({ message: 'Error sending email' });
            }

            res.json({ message: 'Email sent successfully' });
        });
    });
});


module.exports = router;