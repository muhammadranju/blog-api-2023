const { Schema, model } = require("mongoose");
const {
  UserRolesEnum,
  UserStatusEnum,
  ModelRefNames,
  VerifyStatus,
} = require("../../constants");
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
        UserRolesEnum.ADMIN,
        UserRolesEnum.EDITOR,
        UserRolesEnum.USER,
        UserRolesEnum.MANAGER,
      ],
      default: UserRolesEnum.USER,
    },
    status: {
      type: String,
      enum: [
        UserStatusEnum.PENDING,
        UserStatusEnum.APPROVED,
        UserStatusEnum.BLOCK,
        UserStatusEnum.DECLINE,
      ],
      default: UserStatusEnum.APPROVED,
    },
    isVerify: {
      type: Boolean,
      default: VerifyStatus.unverified,
    },
  },
  { timestamps: true }
);

const User = model(ModelRefNames.User, userSchema);
module.exports = User;
