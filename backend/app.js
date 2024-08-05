// server.js or app.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000; // or your preferred port

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Route to handle sending email
app.post('/send-email', (req, res) => {
  const { user_email, user_message } = req.body;

  const mailOptions = {
    from: user_email, // The sender's email address
    to: 'ssstharunvikas@gmail.com', // The default recipient email address
    subject: 'New Message from Contact Form',
    text: `Message from: ${user_email}\n\n${user_message}`, // Email body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, error: error.toString() });
    }
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
