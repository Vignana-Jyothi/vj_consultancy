import pool from "../config/db.js";

export async function getStudentProfile(email) {

    const result = await pool.query(
        `
        SELECT *
        FROM student_profiles
        WHERE student_email = $1
        `,
        [email]
    );

    if (result.rows.length > 0) {
        return result.rows[0];
    }

    return {
        student_email: email,
        student_name: "",
        phone_number: "",
        github_url: "",
        linkedin_url: "",
        resume_url: "",
        profile_picture: "",
        skills: "",
        bio: ""
    };

}

export async function applyProject(email, user, data) {

    const {
        project_id,
        student_name,
        phone_number,
        github_url,
        linkedin_url,
        resume_url,
        profile_picture,
        cover_note,
        additional_comments
    } = data;

    const alreadyApplied = await pool.query(
        `
        SELECT *
        FROM applications
        WHERE project_id=$1
        AND student_email=$2
        `,
        [project_id, email]
    );

    if (alreadyApplied.rows.length > 0) {

        const error = new Error("You already applied for this project.");
        error.statusCode = 400;
        throw error;

    }

    await pool.query(
        `
        INSERT INTO applications
        (
            project_id,
            student_email,
            student_name,
            phone_number,
            github_url,
            linkedin_url,
            resume_url,
            profile_picture,
            cover_note,
            additional_comments
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )
        `,
        [
            project_id,
            email,
            student_name,
            phone_number,
            github_url,
            linkedin_url,
            resume_url,
            profile_picture,
            cover_note,
            additional_comments
        ]
    );

    return {
        message: "Application submitted successfully."
    };

}

export async function getMyApplications(email) {

    const result = await pool.query(
        `
        SELECT
            a.application_id,
            a.project_id,
            a.student_email,
            a.status,
            a.applied_at,
            a.resume_url,
            a.cover_note,
            a.additional_comments,

            p.updated_at AS updated_at,
            p.title,
            p.category,
            p.payment_type,
            p.budget,
            p.estimated_budget,
            p.duration,
            p.estimated_duration

        FROM applications a

        JOIN projects p
        ON a.project_id = p.project_id

        WHERE a.student_email = $1

        ORDER BY a.applied_at DESC
        `,
        [email]
    );

    return result.rows;
}