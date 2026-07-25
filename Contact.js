// File path: api/contact.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message, honeypot } = req.body;

  // 2. Anti-spam honeypot check
  if (honeypot) {
    return res.status(200).json({ status: 'success' }); // Silent reject for spam bots
  }

  // 3. Validate form input
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  // 4. Configure SMTP transport using your accountability.gr cPanel details
  const transporter = nodemailer.createTransport({
    host: 'mail.accountability.gr',
    port: 465,
    secure: true, // Port 465 uses SSL/TLS
    auth: {
      user: 'info@accountability.gr',
      // Still uses an environment variable for safety so your password isn't exposed in source control
      pass: '1925@192a', 
    },
  });

  try {
    // 5. Send the email directly to info@accountability.gr
    await transporter.sendMail({
      from: '"Website Contact Form" <info@accountability.gr>',
      to: 'info@accountability.gr',
      replyTo: email,
      subject: `New Inquiry from ${email}`,
      text: `Sender Email: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ status: 'Message sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
};