const jwt = require("jsonwebtoken");
function jwtVerifyToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
const isLogin = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    token = token?.split(" ")[1];
    const user = jwtVerifyToken(token);
    if (user?.status) {
      return res.status(401).json({ error: "Return home" });
    }

    console.log(user?.status);
    return next();
  } catch (error) {
    next();
  }
};

module.exports = isLogin;
