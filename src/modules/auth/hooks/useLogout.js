import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            setAuth({ isAuthenticated: false, user: null });
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return logout;
}
