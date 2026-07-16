import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import * as projectController from "../controllers/projectController.js";
import authorizeRole from "../middleware/authorizeRole.js";


const router = express.Router();

router.post("/", verifyToken,authorizeRole("project_sourcer"), projectController.createProject)
router.get("/", verifyToken,authorizeRole("project_sourcer"), projectController.getProjects);
router.get("/:id", verifyToken,authorizeRole("project_sourcer"),projectController.getProjectById);
router.put("/:id", verifyToken,authorizeRole("project_sourcer"),projectController.updateProject);
export default router;