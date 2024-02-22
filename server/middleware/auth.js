import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
export const isAuthenticated = AsyncHandler(async (req, res, next) => {
  let token = req.cookies;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      // Verify the token
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded: ", decoded);
        const user = await User.findById(decoded._id);
        // console.log(user);
        req.user = user;
        next();
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  } else {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
});

// authorization
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
};
