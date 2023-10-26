const bcrypt = require("bcrypt");

async function generateBcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function compareBcryptPassword(password, hashPassword) {
  const comparePassword = await bcrypt.compare(password, hashPassword);
  return comparePassword;
}

module.exports = { generateBcryptPassword, compareBcryptPassword };
