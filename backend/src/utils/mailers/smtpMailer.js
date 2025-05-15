const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const send = async ({ to, subject, html, attachments = [] }) => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
    attachments, // format: [{ filename, path }]
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { send };
