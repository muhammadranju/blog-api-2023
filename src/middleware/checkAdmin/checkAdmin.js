const { roles } = require("../../config/constants");
const checkAdmin = (req, res, next) => {
  if (req.user.role !== roles.admin) {
    return res
      .status(401)
      .json({ status: 401, error: "You don't have permission to access" });
  }

  next();
};

module.exports = { checkAdmin };
