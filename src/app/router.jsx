import { useAtomValue } from "jotai";
import { authAtom } from "../modules/auth/atoms/authAtom";
import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../modules/auth/pages/LoginPage";
import { HomePage } from "../modules/Home/pages/Home";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAtomValue(authAtom);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAtomValue(authAtom);
    return isAuthenticated ? <Navigate to="/" /> : children;
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
