import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import HttpError from "../models/http-error.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.send({
        success: true,
        data: {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          pictureUrl: user.pictureUrl,
          token: generateToken(user._id),
        },
        message: "Login successful",
      });
    } else {
      return next(new HttpError("Invalid email or password", 401));
    }
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/changePassword
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }
    let { password } = req.body;
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return next(new HttpError("Invalid user Id", 401));
    }
    if (await user.matchPassword(password, user.password)) {
      res.send({
        success: false,
        message: "Password is same",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      user.password = password;
      let result = await User.findByIdAndUpdate(user._id, { ...user });
      if (!result) {
        return next(
          new HttpError("Something went wrong while updating the password", 400)
        );
      } else {
        res.send({
          success: true,
          message: "Password changed successfully",
        });
      }
    }
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new HttpError("User already exists", 400));
    }
    let pictureUrl = `https://avatars.dicebear.com/api/miniavs/${Math.random()}.svg`;
    const user = await User.create({
      email,
      password,
      pictureUrl,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          pictureUrl: user.pictureUrl,
          token: generateToken(user._id),
        },
        message: "User registered successfully",
      });
    } else {
      res.status(400);
      return next(new HttpError("Invalid user data", 400));
    }
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

export { registerUser, authUser, changePassword };
