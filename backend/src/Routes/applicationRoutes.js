import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import * as applicationController from "../controllers/applicationController.js";

const router = express.Router();

router.get("/profile", verifyToken, applicationController.getStudentProfile);

router.post("/", verifyToken, applicationController.applyProject);

router.get("/my", verifyToken, applicationController.getMyApplications);

export default router;