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
    pictureUrl: {
      type: String,
      required: true,
      default: "",
    },
    activeWallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("collection", "User");

userSchema.methods.matchPassword = async function (
  enteredPassword,
  schemaExists = true,
  prevPassword = ""
) {
  return await bcrypt.compare(
    enteredPassword,
    schemaExists ? this.password : prevPassword
  );
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
