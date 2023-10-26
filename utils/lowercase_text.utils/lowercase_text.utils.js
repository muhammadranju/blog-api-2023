// const lowerUsername = username.split(" ").join("").toLowerCase();
// const findUserEmail = await User.findOne({ email });

function lowercaseText(text) {
  if (!text) {
    return "Lower Text is required.🚫";
  }
  const lowerText = text.split(" ").join("").toLowerCase();
  return lowerText;
}

module.exports = lowercaseText;
