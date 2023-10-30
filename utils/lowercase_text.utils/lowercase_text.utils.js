// const lowerUsername = username.split(" ").join("").toLowerCase();
// const findUserEmail = await User.findOne({ email });

function lowercaseText(text, split, join) {
  if (!text) {
    return "Lower Text is required.🚫";
  }
  if (!join) {
    return text.split(split);
  }
  if (!split) {
    return text.toLowerCase();
  }
  return text.split(split).join(join).toLowerCase();
}

module.exports = lowercaseText;
