// return res.status(401).json({
//   status: 401,
//   message: "Unauthorized access",
//   error: error.message,
// });

function response(res, message, status) {
  return res.status(status).json({ status, message });
}
module.exports = response;
