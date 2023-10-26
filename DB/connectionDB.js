const mongoose = require("mongoose");
const server = "127.0.0.1:27017" || process.env.SERVER_URI; // REPLACE WITH YOUR OWN SERVER
const database = process.env.DATABASE_NAME; // REPLACE WITH YOUR OWN DB NAME

const connectionDB = mongoose
  .connect(`mongodb://${server}/${database}`)
  .then(() => {
    console.log("MongoDB connected!!");
    return true;
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
    return false;
  });

module.exports = connectionDB;
