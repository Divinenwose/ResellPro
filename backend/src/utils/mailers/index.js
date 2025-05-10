const mailgunMailer = require("./mailgunMailer");
const smtpMailer = require("./smtpMailer");

const providers = {
  mailgun: mailgunMailer,
  smtp: smtpMailer,
};

const sendEmail = async (options) => {
  const primary = process.env.MAIL_PROVIDER || "mailgun";
  const fallback = process.env.MAIL_FALLBACK_PROVIDER;

  const trySend = async (providerName) => {
    const mailer = providers[providerName];
    if (!mailer) throw new Error(`Unsupported mail provider: ${providerName}`);
    return await mailer.send(options);
  };

  try {
    return await trySend(primary);
  } catch (err) {
    console.warn(`Primary provider (${primary}) failed:`, err.message);
    if (fallback && fallback !== primary) {
      try {
        return await trySend(fallback);
      } catch (fallbackErr) {
        console.error(`Fallback provider (${fallback}) also failed:`, fallbackErr.message);
        throw fallbackErr;
      }
    } else {
      throw err;
    }
  }
};

module.exports = { sendEmail };
