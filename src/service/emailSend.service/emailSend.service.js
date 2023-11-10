const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSKEY,
//   },
// });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE, // host for mailtrap
  port: process.env.EMAIL_PORT,
  // secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function emailSend(options) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    // from: `"Google 👻"${process.env.EMAIL}`, // sender address
    from: `"Google 👻"<ranju@muhammadranju.com>`, // sender address
    to: `${options.email}`, // list of receivers
    subject: "Verify email", // Subject line
    text: "Verify your email address", // plain text body
    html: `<div>
      <h1>Hi ${options.name}</h1>
      <h2>Verify your email</h2>
      <a href="${options.token}"> <button style="padding: 10px; border: 0px; border-radius: 10px; cursor: pointer; font-size: larger; font-weight: bold; background-color: blueviolet; color: white;">Verify</button></a>
    </div>`, // html body
  });
  console.log("Message successfully sent at: %s", info.messageId);
}

module.exports = emailSend;
