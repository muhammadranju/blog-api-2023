const jwt = require("jsonwebtoken");
// const payload = {
//     name: compareBcryptPassword.fullName,
//     email: compareBcryptPassword.email,
//     roll: compareBcryptPassword.roll,
//   };

function jwtGeneratorSignToken(payload, expiresDate = "1h") {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresDate,
  });
  return token;
}

function jwtVerifyToken(token) {
  const userToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return userToken;
}
module.exports = { jwtGeneratorSignToken, jwtVerifyToken };
