import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {

    const { user, loading } = useAuth();
    console.log("Loading:", loading);
    console.log("User:", user);

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;