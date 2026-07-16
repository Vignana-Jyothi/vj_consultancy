import axios from "axios";
import pool from "../config/db.js";

const AUTH_URL = process.env.AUTH_URL || "http://localhost:2999";

const verifyToken = async (req, res, next) => {

    try {

        // Get JWT from Cookie
        const token = req.cookies.userToken;

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }

        // Verify Token with Auth Server
        const response = await axios.post(
            `${AUTH_URL}/verify-token`,
            {
                token
            }
        );

        // Check Auth Server Response
        if (!response.data.valid) {

            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });

        }

        // Store Logged-in User
       // Store Logged-in User
      // Store Logged-in User
        // Store Logged-in User
req.user = response.data.user;

// Fetch user's role from database
const roleResult = await pool.query(
    `
    SELECT role
    FROM users
    WHERE LOWER(email) = LOWER($1)
    `,
    [req.user.email]
);

if (roleResult.rows.length === 0) {
    return res.status(403).json({
        success: false,
        message: "User is not registered."
    });
}

// Attach role to req.user
req.user.role = roleResult.rows[0].role;

console.log("Role query:", roleResult.rows);
console.log("Final req.user:", req.user);

next();

    } catch (error) {

        console.error(
            "Token verification failed:",
            error.response?.data || error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

export default verifyToken;