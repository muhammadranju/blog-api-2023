const { roles } = require("../../config/constants");
const checkAdmin = (req, res, next) => {
  if (req.user.role !== roles.admin) {
    return res
      .status(403)
      .json({ status: 403, error: "You don't have to access" });
  }

  next();
};

module.exports = { checkAdmin };
