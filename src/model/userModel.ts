import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: String,
    },
    role: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", UserModel);

export default User;
