const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    }
});

router.use(express.json());

router.post('/send-attach', upload.single('file'), (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        text,
        attachments: [
            {
                filename: req.file.originalname,
                content: req.file.buffer
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.' });
        } else {
            res.json({ message: 'E-mail envoyé avec succès.' });
        }
    });
});

module.exports = router;
