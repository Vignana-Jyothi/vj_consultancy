import pool from "../config/db.js";

export async function createProject(data) {

    const {
        title,
        description,
        client_requirements,
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
    } = data;

    const finalPaymentType = payment_type || "fixed";

    // Validation
    if (!title || !description || !skills) {
        const error = new Error("Title, description and skills are required.");
        error.statusCode = 400;
        throw error;
    }

    if (finalPaymentType === "fixed") {

        if (!budget || !duration || !deadline) {
            const error = new Error("Budget, duration and deadline are required for Fixed Price projects.");
            error.statusCode = 400;
            throw error;
        }

    } else if (finalPaymentType === "hourly") {

        if (
            !hourly_rate ||
            !estimated_hours ||
            !estimated_budget ||
            !estimated_duration
        ) {
            const error = new Error(
                "Hourly rate, estimated hours, estimated budget and estimated duration are required."
            );
            error.statusCode = 400;
            throw error;
        }

    } else {

        const error = new Error("Invalid payment type.");
        error.statusCode = 400;
        throw error;

    }

    await pool.query(
        `
        INSERT INTO projects
        (
            title,
            description,
            client_requirements,
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
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
        )
        `,
        [
            title,
            description,
            client_requirements,
            skills,
            category,
            finalPaymentType === "fixed" ? budget : null,
            finalPaymentType === "fixed" ? duration : null,
            finalPaymentType === "fixed" ? deadline : null,
            source_website,
            finalPaymentType,
            finalPaymentType === "hourly" ? hourly_rate : null,
            finalPaymentType === "hourly" ? estimated_hours : null,
            finalPaymentType === "hourly" ? estimated_budget : null,
            finalPaymentType === "hourly" ? estimated_duration : null
        ]
    );

    await pool.query(
        `
        INSERT INTO activities(message)
        VALUES($1)
        `,
        [`${title} published`]
    );

    return {
        message: "Project created successfully"
    };
}

export async function getProjects(filters) {

    const {
        search,
        category,
        duration,
        budget,
        paymentType
    } = filters;

    let query = `
        SELECT *
        FROM projects
        WHERE status = 'Published'
    `;

    let values = [];

    // Search
    if (search) {

        values.push(`%${search}%`);

        query += `
            AND (
                title ILIKE $${values.length}
                OR skills ILIKE $${values.length}
            )
        `;

    }

    // Category
    if (category) {

        values.push(category);

        query += `
            AND category = $${values.length}
        `;

    }

    // Payment Type
    if (paymentType) {

        values.push(paymentType);

        query += `
            AND payment_type = $${values.length}
        `;

    }

    // Budget
    if (budget === "under20000") {

        query += `
            AND (
                (payment_type='fixed' AND budget < 20000)
                OR
                (payment_type='hourly' AND estimated_budget < 20000)
            )
        `;

    }

    else if (budget === "20000-50000") {

        query += `
            AND (
                (payment_type='fixed' AND budget BETWEEN 20000 AND 50000)
                OR
                (payment_type='hourly' AND estimated_budget BETWEEN 20000 AND 50000)
            )
        `;

    }

    else if (budget === "above50000") {

        query += `
            AND (
                (payment_type='fixed' AND budget > 50000)
                OR
                (payment_type='hourly' AND estimated_budget > 50000)
            )
        `;

    }

    // Duration
    if (duration === "0-4") {

        query += `
            AND (
                CAST(split_part(COALESCE(duration, estimated_duration),' ',1) AS INTEGER)
                BETWEEN 0 AND 4
            )
        `;

    }

    else if (duration === "1-3") {

        query += `
            AND (
                CAST(split_part(COALESCE(duration, estimated_duration),' ',1) AS INTEGER)
                BETWEEN 5 AND 12
            )
        `;

    }

    else if (duration === "3+") {

        query += `
            AND (
                CAST(split_part(COALESCE(duration, estimated_duration),' ',1) AS INTEGER)
                > 12
            )
        `;

    }

    query += `
        ORDER BY created_at DESC
    `;

    const result = await pool.query(query, values);

    return result.rows;
}

export async function getProjectById(id) {

    const result = await pool.query(
        `
        SELECT *
        FROM projects
        WHERE project_id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {

        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;

    }

    return result.rows[0];

}

export async function updateProject(id, data) {

    const {
        title,
        description,
        client_requirements,
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
    } = data;

    const existingProject = await pool.query(
        `
        SELECT *
        FROM projects
        WHERE project_id = $1
        `,
        [id]
    );

    if (existingProject.rows.length === 0) {

        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;

    }

    const finalPaymentType = payment_type || "fixed";

    if (!title || !description || !skills) {

        const error = new Error("Title, description and skills are required.");
        error.statusCode = 400;
        throw error;

    }

    if (finalPaymentType === "fixed") {

        if (!budget || !duration || !deadline) {

            const error = new Error("Budget, duration and deadline are required for Fixed Price projects.");
            error.statusCode = 400;
            throw error;

        }

    } else if (finalPaymentType === "hourly") {

        if (
            !hourly_rate ||
            !estimated_hours ||
            !estimated_budget ||
            !estimated_duration
        ) {

            const error = new Error(
                "Hourly rate, estimated hours, estimated budget and estimated duration are required."
            );

            error.statusCode = 400;
            throw error;

        }

    } else {

        const error = new Error("Invalid payment type.");
        error.statusCode = 400;
        throw error;

    }

    const updatedProject = await pool.query(
        `
        UPDATE projects
        SET
            title = $1,
            description = $2,
            client_requirements = $3,
            skills = $4,
            category = $5,
            budget = $6,
            duration = $7,
            deadline = $8,
            source_website = $9,
            payment_type = $10,
            hourly_rate = $11,
            estimated_hours = $12,
            estimated_budget = $13,
            estimated_duration = $14,
            updated_at = NOW()
        WHERE project_id = $15
        RETURNING *
        `,
        [
            title,
            description,
            client_requirements,
            skills,
            category,
            finalPaymentType === "fixed" ? budget : null,
            finalPaymentType === "fixed" ? duration : null,
            finalPaymentType === "fixed" ? deadline : null,
            source_website,
            finalPaymentType,
            finalPaymentType === "hourly" ? hourly_rate : null,
            finalPaymentType === "hourly" ? estimated_hours : null,
            finalPaymentType === "hourly" ? estimated_budget : null,
            finalPaymentType === "hourly" ? estimated_duration : null,
            id
        ]
    );

    await pool.query(
        `
        INSERT INTO activities(message)
        VALUES($1)
        `,
        [`${title} updated`]
    );

    return updatedProject.rows[0];

}