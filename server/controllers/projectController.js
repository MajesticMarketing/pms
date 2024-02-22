import AsyncHandler from "express-async-handler";
import { Project } from "../models/projectModel.js";
import { validationResult } from "express-validator";
import { User } from "../models/userModel.js";

export const createProject = AsyncHandler(async (req, res) => {
  // Get the errors from validating the request parameters
  const errors = validationResult(req);

  // If there are errors, send them back to the client with a status of Bad Request (400).
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  const { title, description, category, deadline } = req.body;
  const user = await User.findById(req.user.id);
  try {
    let project = await Project.findOne({ title });
    if (project) {
      return res
        .status(400)
        .send("This project already exists. Please choose an another name");
    }
    // Create new project using model instance and save it in the database
    if (!title || !description || !category || !deadline) {
      res.status(422).send("These Fields are required");
    }
    const newProject = await Project.create({
      title,
      description,
      category,
      deadline,
      createdBy: req.user.id,
    });
    await newProject.save();
    // Send the newly created resource back to the client with a status of Created (201).
    res.status(201).json({
      status: "success",
      message: "Project Created Successfully",
      newProject,
    });
  } catch (err) {
    // If creating the resource failed, send an Internal Server Error (500) response.
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
export const getSingleProject = AsyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    // check for project existence
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
    // Return response
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
export const getAllProjects = AsyncHandler(async (req, res) => {
  // Get the errors from validating the request parameters
  const errors = validationResult(req);
  try {
    const projects = await Project.find();
    // console.log(projects);
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
    });
  }
});
export const getUpdatedProject = AsyncHandler(async (req, res) => {
  const { title, category, description, deadline } = req.body;
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      res.status(400).json({ error: "Server Error" });
    }
    if (project.createdBy.toString() !== req.user.id) {
      res.status(400).json({ error: "Invalid User" });
    }
    const updatedProject = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title,
        category,
        description,
        deadline,
      }
    );
    return res.status(201).send({
      success: true,
      message: "Project Updated Successfully",
      updatedProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
