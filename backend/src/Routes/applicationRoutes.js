import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import * as applicationController from "../controllers/applicationController.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/profile", verifyToken, authorizeRole("student"),applicationController.getStudentProfile);

router.post("/", verifyToken, authorizeRole("student"),applicationController.applyProject);

router.get("/my", verifyToken, authorizeRole("student"),applicationController.getMyApplications);

export default router;