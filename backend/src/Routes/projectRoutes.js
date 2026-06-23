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
        await pool.query(
    `
    INSERT INTO activities(message)
    VALUES($1)
    `,
    [`${title} published`]
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
router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM projects
            WHERE project_id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Project not found"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

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
        const existingProject = await pool.query(
    `
    SELECT *
    FROM projects
    WHERE project_id = $1
    `,
    [id]
);
if (existingProject.rows.length === 0) {

    return res.status(404).json({
        message: "Project not found"
    });

}
const updatedProject = await pool.query(
    `
    UPDATE projects
    SET
        title = $1,
        description = $2,
        skills = $3,
        category = $4,
        budget = $5,
        duration = $6,
        deadline = $7,
        source_website = $8,
        updated_at = NOW()
    WHERE project_id = $9
    RETURNING *
    `,
    [
        title,
        description,
        skills,
        category,
        budget,
        duration,
        deadline,
        source_website,
        id
    ]
);
res.json(updatedProject.rows[0]);
await pool.query(
    `
    INSERT INTO activities(message)
    VALUES($1)
    `,
    [`${title} updated`]
);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            message: "Server Error"
        });

    }

});
export default router;