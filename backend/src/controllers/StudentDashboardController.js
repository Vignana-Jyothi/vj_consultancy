import { getDashboardData } from "../services/StudentDashboardServices.js";

export async function getStudentDashboard(req, res) {

    try {

        const email = req.user.email;
        console.log("Logged in email:", email);

        const dashboardData = await getDashboardData(email);

        res.status(200).json(dashboardData);

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            message: "Failed to fetch dashboard data."
        });

    }

}