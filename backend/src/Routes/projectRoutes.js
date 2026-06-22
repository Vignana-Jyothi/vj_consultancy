import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const {
            title,
            description,
            skills,
            category,
            budget,
            duration,
            deadline,
            source_website
        } = req.body;

        await pool.query(
            `
            INSERT INTO projects
            (
                title,
                description,
                skills,
                category,
                budget,
                duration,
                deadline,
                source_website
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            `,
            [
                title,
                description,
                skills,
                category,
                budget,
                duration,
                deadline,
                source_website
            ]
        );

        res.status(201).json({
            message: "Project created successfully"
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

//----Get all projects------------
router.get("/", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM projects"
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            message: "Server Error"
        });
    }

});
export default router;