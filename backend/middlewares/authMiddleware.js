import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return next(new HttpError("Not authorized, token failed", 401));
    }
  }

  if (!token) {
    return next(new HttpError("Not authorized, no token", 401));
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new HttpError("Not authorized as an admin", 401));
  }
};

export { protect, admin };
