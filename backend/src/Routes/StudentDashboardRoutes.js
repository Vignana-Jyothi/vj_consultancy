import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import { getStudentDashboard } from "../controllers/StudentDashboardController.js";

const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    getStudentDashboard
);

export default router;