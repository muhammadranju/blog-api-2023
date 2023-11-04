const response = require("../../utils/response.utils/response.utils");

const restricted = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return response(res, "You don't have permission to access", 403);
    }
    next();
  };
};

module.exports = restricted;
