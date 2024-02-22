import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
    valid: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "manager", "guest"],
  },
  refreshToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.plugin(uniqueValidator);
// Method to compare a plain text password with the encrypted one in the database
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Before saving the model we encrypt the password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
// Generating a user token
userSchema.methods.getAuthToken = function () {
  // Generate a token that expires in 7 days
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const User = mongoose.model("User", userSchema);
