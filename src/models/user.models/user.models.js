const { Schema, model } = require("mongoose");
const constants = require("../../config/constants");
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
      enum: [
        constants.roles.admin,
        constants.roles.editor,
        constants.roles.user,
        constants.roles.manager,
      ],
      default: constants.roles.user,
    },
    status: {
      type: String,
      enum: [
        constants.status.pending,
        constants.status.approved,
        constants.status.block,
        constants.status.decline,
      ],
      default: constants.status.pending,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model(constants.ref.user, userSchema);
module.exports = User;
