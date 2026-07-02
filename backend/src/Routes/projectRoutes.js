import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router.post("/", verifyToken, projectController.createProject)
router.get("/", verifyToken, projectController.getProjects);
router.get("/:id", verifyToken,projectController.getProjectById);
router.put("/:id", verifyToken,projectController.updateProject);
export default router;