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
            source_website,
            payment_type,
            hourly_rate,
            estimated_hours,
            estimated_budget,
            estimated_duration
        } = req.body;

        const finalPaymentType = payment_type || 'fixed';

        if (!title || !description || !skills) {
            return res.status(400).json({ message: 'Title, description, and skills are required.' });
        }

        if (finalPaymentType === 'fixed') {
            if (!budget || !duration || !deadline) {
                return res.status(400).json({ message: 'Budget, duration, and deadline are required for Fixed Price projects.' });
            }
        } else if (finalPaymentType === 'hourly') {
            if (!hourly_rate || !estimated_hours || !estimated_budget || !estimated_duration) {
                return res.status(400).json({ message: 'Hourly rate, estimated hours, estimated budget, and estimated duration are required for Hourly projects.' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid payment type.' });
        }

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
                source_website,
                payment_type,
                hourly_rate,
                estimated_hours,
                estimated_budget,
                estimated_duration
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
            )
            `,
            [
                title,
                description,
                skills,
                category,
                finalPaymentType === 'fixed' ? budget : null,
                finalPaymentType === 'fixed' ? duration : null,
                finalPaymentType === 'fixed' ? deadline : null,
                source_website,
                finalPaymentType,
                finalPaymentType === 'hourly' ? hourly_rate : null,
                finalPaymentType === 'hourly' ? estimated_hours : null,
                finalPaymentType === 'hourly' ? estimated_budget : null,
                finalPaymentType === 'hourly' ? estimated_duration : null
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
            source_website,
            payment_type,
            hourly_rate,
            estimated_hours,
            estimated_budget,
            estimated_duration
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

        const finalPaymentType = payment_type || 'fixed';

        if (!title || !description || !skills) {
            return res.status(400).json({ message: 'Title, description, and skills are required.' });
        }

        if (finalPaymentType === 'fixed') {
            if (!budget || !duration || !deadline) {
                return res.status(400).json({ message: 'Budget, duration, and deadline are required for Fixed Price projects.' });
            }
        } else if (finalPaymentType === 'hourly') {
            if (!hourly_rate || !estimated_hours || !estimated_budget || !estimated_duration) {
                return res.status(400).json({ message: 'Hourly rate, estimated hours, estimated budget, and estimated duration are required for Hourly projects.' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid payment type.' });
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
        payment_type = $9,
        hourly_rate = $10,
        estimated_hours = $11,
        estimated_budget = $12,
        estimated_duration = $13,
        updated_at = NOW()
    WHERE project_id = $14
    RETURNING *
    `,
    [
        title,
        description,
        skills,
        category,
        finalPaymentType === 'fixed' ? budget : null,
        finalPaymentType === 'fixed' ? duration : null,
        finalPaymentType === 'fixed' ? deadline : null,
        source_website,
        finalPaymentType,
        finalPaymentType === 'hourly' ? hourly_rate : null,
        finalPaymentType === 'hourly' ? estimated_hours : null,
        finalPaymentType === 'hourly' ? estimated_budget : null,
        finalPaymentType === 'hourly' ? estimated_duration : null,
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