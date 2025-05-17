// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-admission-mail', async (req, res) => {
    const { to, name, userId, password } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'admission@singhaniauniversity.ac.in',
            pass: 'SUAdm@2025'
        }
    });

    const mailOptions = {
        from: '"Singhania University" <admission@singhaniauniversity.ac.in>',
        to,
        subject: 'Singhania University ERP Login Credentials',
        html:`
      <p><strong>Auto Email – ERP Login Credentials</strong></p>

      <p>Dear ${name},</p>

      <p>Welcome to Singhania University!</p>

      <p>Here are your ERP login credentials to access the application portal:</p>

      <ul>
        <li><strong>Username (Email ID):</strong> ${userId}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>

      <p>
        Please log in at the 
        <a href="https://erp.singhaniauniversity.ac.in" target="_blank">Application Portal</a>
        and complete your application process.
      </p>

      <p>We recommend completing the application at the earliest to secure your seat.</p>

      <p>
        Wishing you the best as you take this important step in your academic journey.
      </p>

      <p>
        Warm regards,<br>
        <strong>Admissions Team</strong><br>
        📧 <a href="mailto:admissions@singhaniauniversity.ac.in">admissions@singhaniauniversity.ac.in</a><br>
        📞 9355168880
      </p>
    `
  };
  

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent' });
    } catch (err) {
        console.error("Email sending error:", err);
        res.status(500).send({ error: 'Failed to send email' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
