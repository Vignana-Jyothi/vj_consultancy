import pool from "../config/db.js";

export async function getDashboardData(email) {

    // Student Name
    const studentResult = await pool.query(
        `
        SELECT student_name
        FROM student_profiles
        WHERE lower(student_email) = lower($1)
        `,
        [email]
    );

    const studentName =
        studentResult.rows.length > 0
            ? studentResult.rows[0].student_name
            : "Student";

    // Active Applications
    const activeApplicationsResult = await pool.query(
        `
        SELECT COUNT(*) AS count
        FROM applications
        WHERE student_email = $1
        AND status NOT IN ('Selected','Rejected')
        `,
        [email]
    );

    // Assigned Projects
    const assignedProjectsResult = await pool.query(
        `
        SELECT COUNT(*) AS count
        FROM project_assignments
        WHERE student_email = $1
        AND status IN ('Assigned','In Progress')
        `,
        [email]
    );

    // Completed Projects
    const completedProjectsResult = await pool.query(
        `
        SELECT COUNT(*) AS count
        FROM project_assignments
        WHERE student_email = $1
        AND status = 'Completed'
        `,
        [email]
    );

    // Pending Payments
    const paymentpending = await pool.query(
        `
        SELECT COALESCE(SUM(amount),0) AS total
        FROM payments
        WHERE student_email = $1
        AND payment_status = 'Pending'
        `,
        [email]
    );
   const paymentreceived=await pool.query(
    `
        SELECT COALESCE(SUM(amount),0) AS total
        FROM payments
        WHERE student_email = $1
        AND payment_status = 'Paid'
        `,
        [email]

   );

    // Recent Applications
    const recentApplicationsResult = await pool.query(
        `
        SELECT
            p.title,
            a.status,
            a.applied_at
        FROM applications a
        JOIN projects p
        ON a.project_id = p.project_id
        WHERE a.student_email = $1
        ORDER BY a.applied_at DESC
        LIMIT 5
        `,
        [email]
    );

    // Recent Notifications
    const recentNotificationsResult = await pool.query(
        `
        SELECT
            title,
            message,
            created_at
        FROM notifications
        WHERE student_email = $1
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [email]
    );

    return {

        studentName,

        summary: {

            activeApplications: Number(activeApplicationsResult.rows[0].count),

            assignedProjects: Number(assignedProjectsResult.rows[0].count),

            completedProjects: Number(completedProjectsResult.rows[0].count),

            pendingPayments: Number(paymentpending.rows[0].total),

            receivedPayments: Number(paymentreceived.rows[0].total)

        },

        recentApplications: recentApplicationsResult.rows,

        recentNotifications: recentNotificationsResult.rows

    };

}