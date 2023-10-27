const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "EDITOR", "USER"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "BLOCK", "DECLINE"],
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
