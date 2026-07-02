import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentialResponse) => {
        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_AUTH_URL}/auth/google`,
                {
                    token: credentialResponse.credential,
                },
                {
                    withCredentials: true,
                }
            );

            setUser(response.data.user);
            console.log("User Set:", response.data.user);

            return response.data;

        } catch (error) {

            console.error("Login Failed:", error);
            throw error;

        } finally {

            setLoading(false);

        }
    };

    const logout = async () => {

        try {

            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_AUTH_URL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            setUser(null);

        } catch (error) {

            console.error("Logout Failed:", error);

        } finally {

            setLoading(false);

        }
    };

    const checkAuth = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${import.meta.env.VITE_AUTH_URL}/check-auth`,
                {
                    withCredentials: true,
                }
            );

            setUser(response.data.user);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        checkAuth();

    }, []);

    const value = {
        user,
        loading,
        login,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};