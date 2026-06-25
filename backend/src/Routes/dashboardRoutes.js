import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/stats", async (req, res) => {

    try {

        const publishedResult = await pool.query(
            "SELECT COUNT(*) FROM projects WHERE status = 'Published'"
        );
        const activeResult = await pool.query(
            "SELECT COUNT(*) FROM projects WHERE status = 'Active'"
        );

        const completedResult = await pool.query(
            "SELECT COUNT(*) FROM projects WHERE status = 'Completed'"
        );

        const deliveredResult = await pool.query(
            "SELECT COUNT(*) FROM projects WHERE status = 'Delivered'"
        );

        res.json({
            published: Number(publishedResult.rows[0].count),
            active: Number(activeResult.rows[0].count),
            completed: Number(completedResult.rows[0].count),
            delivered: Number(deliveredResult.rows[0].count)
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.get("/activities", async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM activities
            ORDER BY created_at DESC
            `
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

export default router;