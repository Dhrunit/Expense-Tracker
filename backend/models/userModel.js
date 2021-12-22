import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    activeWallet: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("collection", "User");
const User = mongoose.model("User", userSchema);

export default User;
