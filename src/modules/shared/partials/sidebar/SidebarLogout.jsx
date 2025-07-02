import { LogOut } from "lucide-react";

export default function SidebarLogout() {
    return (
        <button
            className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
            onClick={() => alert("Cerrar sesión")}
        >
            <LogOut />
            <span>Cerrar Sesión</span>
        </button>
    );
}
