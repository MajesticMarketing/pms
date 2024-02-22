import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// refresh token
router.get("/refresh", refreshToken);

export default router;
