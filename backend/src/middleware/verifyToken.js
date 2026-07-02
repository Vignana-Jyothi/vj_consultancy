import axios from "axios";

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
        req.user = response.data.user;
       console.log(req.user);
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