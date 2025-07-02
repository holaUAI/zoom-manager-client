// src/layout/sidebar/Sidebar.jsx
import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SidebarHeader from "../../partials/sidebar/SidebarHeader";
import SidebarMenu from "../../partials/sidebar/SidebarMenu";
import SidebarLogout from "../../partials/sidebar/SidebarLogout";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            {/* Botón hamburguesa */}
            <button
                className="md:hidden p-3 fixed top-4 left-4 z-50 bg-white shadow rounded-lg"
                onClick={() => setOpen(!open)}
            >
                <Menu />
            </button>

            {/* Sidebar principal */}
            <aside
                className={`fixed md:static z-40 top-0 left-0 h-full bg-white border-r transition-transform duration-300 ease-in-out ${open ? "translate-x-0 w-64" : "-translate-x-full"
                    } md:translate-x-0 md:w-64`}
            >
                <div className="flex flex-col h-full justify-between p-4">
                    <div>
                        <SidebarHeader />
                        <SidebarMenu isActive={isActive} />
                    </div>
                    <SidebarLogout />
                </div>
            </aside>
        </>
    );
}
