const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

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
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests')
});