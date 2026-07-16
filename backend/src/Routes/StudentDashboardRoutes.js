import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import { getStudentDashboard } from "../controllers/StudentDashboardController.js";
import authorizeRole from "../middleware/authorizeRole.js";
const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    authorizeRole("student"),
    getStudentDashboard
);

export default router;