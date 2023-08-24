const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-html', async (req, res) => {
    const { to, subject, html } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

module.exports = router;