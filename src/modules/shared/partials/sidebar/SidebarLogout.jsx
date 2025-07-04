import { LogOut } from "lucide-react";
import { useLogout } from "../../../auth/hooks/useLogout";
export default function SidebarLogout({ open }) {
    const logout = useLogout();

    return (
        <button
            className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
            onClick={logout}
        >
            <LogOut />
            {open && <span>Cerrar Sesión</span>}
        </button>
    );
}
