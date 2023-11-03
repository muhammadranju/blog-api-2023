const User = require("../../libs/user.libs/user.libs");

const jwt = require("../../service/jwt_generator.service/jwt_generator.service");
const response = require("../../utils/response.utils/response.utils");

async function authentication(req, res, next) {
  try {
    //TODO: let token = req.headers.authorization || req.cookies.access_token;
    let token = req.headers.authorization;
    if (token === undefined) {
      return response(res, "Unauthorized access", 401);
    }
    token = token.split(" ")[1];

    const { user_id } = jwt.jwtVerifyToken(token);

    if (!user_id) {
      return response(res, "Unauthorized token", 401);
    }
    req.user = await User.findUserById(user_id);

    return next();
  } catch (error) {
    console.log(error.message);
    return response(res, "Unauthorized token", 401);
  }
}
module.exports = authentication;
