const User = require("../../libs/user.libs/user.libs");

const jwt = require("jsonwebtoken");
const response = require("../../utils/response.utils/response.utils");

function jwtVerifyToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

async function authentication(req, res, next) {
  try {
    //TODO: let token = req.headers.authorization || req.cookies.access_token;
    let token = req.headers.authorization;
    if (token === undefined) {
      return response(res, "Unauthorized invalid access", 401);
    }
    token = token.split(" ")[1];

    const { user_id } = jwtVerifyToken(token);

    if (!user_id) {
      return response(res, "Unauthorized invalid token", 401);
    }
    req.user = await User.findUserById(user_id);

    return next();
  } catch (error) {
    console.log(error.message);
    return response(res, "Unauthorized invalid token", 401);
    return next(error);
  }
}
module.exports = authentication;
