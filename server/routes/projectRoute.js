import express from "express";
const router = express.Router();
import {
  createProject,
  getAllProjects,
  getSingleProject,
  getUpdatedProject,
} from "../controllers/projectController.js";
import { isAuthenticated } from "../middleware/auth.js";
router.post("/add-project", isAuthenticated, createProject);
router.get("/all-project", isAuthenticated, getAllProjects);
router.get("/:id", isAuthenticated, getSingleProject);
router.put("/update:id", isAuthenticated, getUpdatedProject);
export default router;
