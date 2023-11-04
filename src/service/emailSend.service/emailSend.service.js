const nodemailer = require("nodemailer");
const jwt = require("../jwtGenerator.service/jwtGenerator.service");

const transporter = nodemailer.createTransport({
  // host: "smtp.forwardemail.net",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSKEY,
  },
});

async function emailSend(userEmail, userName) {
  const payload = {
    email: userEmail,
  };
  const token = jwt.jwtGeneratorSignToken(payload, "1d");
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Google 👻"${process.env.EMAIL}`, // sender address
    to: `${userEmail}, ${userEmail}`, // list of receivers
    subject: "Verify email", // Subject line
    text: "Verify your email address", // plain text body
    html: `<div>
      <h1>Hi ${userName}</h1>
      <h2>Verify your email</h2>
      <a href="${process.env.BASE_URL}/api/v1/user/verify/${token}"> <button style="padding: 10px; border: 0px; border-radius: 10px; cursor: pointer; font-size: larger; font-weight: bold; background-color: blueviolet; color: white;">Verify</button></a>
    </div>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = emailSend;
