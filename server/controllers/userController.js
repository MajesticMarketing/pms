import AsyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { sendToken } from "../middleware/sendToken.js";
import { validateMongoId } from "../utils/validateMongoId.js";

// register a user
export const registerUser = AsyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //check if user already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).send({
        success: false,
        message:
          "Required Email is already registered. Please Choose New One or Login ",
      });
    }
    //create a new user and save it to the database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    //return json response of the created user
    res.status(201).json({
      success: true,
      message: "Account has been Created Successfully!",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// login the user
export const loginUser = AsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate inputs
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide an email and password",
      });
    }
    //check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Email or Password" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Email or Password" });
    }
    //if everything is good return a token
    sendToken(user, 201, res, "Login Successful");
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});
// // Update the User
// export const updateSingleUser = AsyncHandler(async (req, res) => {
//   const { id } = req.user;
//   validateMongoId(_id);
//   const {firstName,lastName} =
// });

// Get User Details
export const getUserDetails = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Get Single User

export const getSingleUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      user,
    });
    console.log(user);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});
// handle refresh token
export const refreshToken = AsyncHandler(async (req, res) => {
  try {
    const token = req.cookies;
    // console.log(token);
    const user = await User.findOne({ sendToken });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update the user
export const updateSingleUser = AsyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        new: true,
      }
    );
    // sendToken(user, 200, res);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Delete a User
export const deleteSingleUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deleteOneUser = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, deleteOneUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Get all users
export const getAllUsers = AsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Block the user

export const blockUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ success: true, message: "user blocked successfully", blockUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Unblock the user

export const unblockUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const unblockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "user unblocked successfully",
      unblockUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update Password
export const updatePassword = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword, confirmPassword } = req.body;
    // checking  current password is correct or not
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect!",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not matched.",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
