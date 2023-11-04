const shortId = require("shortid");
const shortIdConverter = (title) => {
  const shortId3 = shortId().slice(0, 3);
  return (
    lowercaseText(title, " ", "-").slice(0, 20) +
    "-" +
    shortId3.toLowerCase().trim()
  );
};
module.exports = shortIdConverter;
