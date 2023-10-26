const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
