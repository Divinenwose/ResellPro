const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const send = async ({ to, subject, html, attachments = [] }) => {
  const data = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
    attachment: attachments,
  };

  return await mg.messages().send(data);
};

module.exports = { send };
