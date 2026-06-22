import express from "express";
import cors from "cors";
import projectRoutes from "./Routes/projectRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res)=>{
    res.json({message: "Welcome to the Project Management API"});
});
app.use("/api/projects", projectRoutes);
export default app;