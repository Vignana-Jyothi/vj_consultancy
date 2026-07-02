import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import cookieParser from "cookie-parser";
import applicationRoutes from "./routes/applicationRoutes.js";
const app = express();
app.use(
    cors({
        origin: "http://localhost:3116",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res)=>{
    res.json({message: "Welcome to the Project Management API"});
});
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/applications", applicationRoutes);
export default app;