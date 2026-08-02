const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Handle CORS preflight check if needed
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, message, honeypot } = req.body || {};

  if (honeypot) {
    return res.status(200).json({ status: 'success' });
  }

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.accountability.gr',
      port: 465,
      secure: true,
      auth: {
        user: 'info@accountability.gr',
        pass: '1925@192a',
      },
    });

    await transporter.sendMail({
      from: '"Website Contact Form" <info@accountability.gr>',
      to: 'info@accountability.gr, seretis@accountability.gr',
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