const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If SMTP is not actively configured, mock the email to the terminal!
  if (process.env.SMTP_EMAIL === 'your_mailtrap_user' || !process.env.SMTP_EMAIL) {
    console.log('\n====== MOCK EMAIL INTERCEPTED ======');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Text:\n${options.message}`);
    console.log('====================================\n');
    return;
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Define email options
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
