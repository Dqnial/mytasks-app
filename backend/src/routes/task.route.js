import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", protectRoute, getTasks);

router.post("/", protectRoute, createTask);

router.put("/:id", protectRoute, updateTask);

router.delete("/:id", protectRoute, deleteTask);

export default router;
