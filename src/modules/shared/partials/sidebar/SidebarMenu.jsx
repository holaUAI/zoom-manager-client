// src/partials/sidebar/SidebarMenu.jsx
import { Video, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function SidebarMenu({ open, isActive }) {
    const links = [
      { to: "/reuniones", label: "Reuniones", icon: <Video /> },
      { to: "/docentes", label: "Docentes", icon: <Users /> },
      { to: "/cursos", label: "Cursos", icon: <BookOpen /> },
    ];
  
    return (
      <nav className="flex flex-col gap-2 mt-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive?.(link.to)
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {open && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>
    );
  }
  