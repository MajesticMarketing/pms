import express from "express";
import {
  updatePassword,
  getSingleUser,
  getAllUsers,
  updateSingleUser,
  deleteSingleUser,
  blockUser,
  unblockUser,
} from "../controllers/userController.js";
import { isAuthenticated, authorizedRoles } from "../middleware/auth.js";

const router = express.Router();

// get single user
router.get("/:id", isAuthenticated, getSingleUser);
// get all users
router.get(
  "/all-users",
  isAuthenticated,
  authorizedRoles(["admin"], ["manager"]),
  getAllUsers
);
// update password
router.put("/password", isAuthenticated, updatePassword);
// delete a user
router.delete("/:id", deleteSingleUser);
// update a user
router.put("/edit-user", isAuthenticated, updateSingleUser);
// block a user
router.put(
  "/block-user/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  blockUser
);
// unblock a user
router.put(
  "/unblock-user/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  unblockUser
);

export default router;
