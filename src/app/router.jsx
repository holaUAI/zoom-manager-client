import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "../modules/shared/utils/authUtils";
import LoginPage from "../modules/auth/pages/login/Login";
import { HomePage } from "../modules/Home/pages/Home";

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/" /> : children;
};

const NotFoundPage = () => <h1>404 - Página no encontrada</h1>;

const router = createBrowserRouter([
    { path: "*", element: <NotFoundPage /> },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                    <HomePage />
            </ProtectedRoute>
        ),
    },
]);

export default router;