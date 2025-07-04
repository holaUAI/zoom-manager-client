import { useAtomValue } from "jotai";
import { authAtom } from "../modules/auth/atoms/authAtom";
import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../modules/auth/pages/login/LoginPage";
import Layout from "../modules/shared/layout/Layout";
import { HomePage } from "../modules/Home/pages/Home";

import ReunionesPage from "../modules/meeting/pages/MeetingsPage";
import TeacherPage from "../modules/teachers/pages/TeachersPage";
import CoursesPage from "../modules/courses/pages/CoursesPage";


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
                <Layout>
                    <HomePage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/reuniones",
        element: (
            <ProtectedRoute>
                <Layout>
                    <ReunionesPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/docentes",
        element: (
            <ProtectedRoute>
                <Layout>
                    <TeacherPage />
                </Layout>
            </ProtectedRoute>
        )
    },
    {
        path: "/cursos",
        element: (
            <ProtectedRoute>
                <Layout>
                    <CoursesPage />
                </Layout>
            </ProtectedRoute>
        )
    },
]);

export default router;
