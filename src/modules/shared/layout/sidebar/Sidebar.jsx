import { Menu } from "lucide-react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../atoms/sidebarAtom";
import SidebarHeader from "../../partials/sidebar/SidebarHeader";
import SidebarMenu from "../../partials/sidebar/SidebarMenu";
import SidebarLogout from "../../partials/sidebar/SidebarLogout";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 1366 && window.innerHeight <= 639;
      setIsSmallScreen(isSmall);
      // Si es pantalla pequeña, forzar la sidebar cerrada al inicio
      if (isSmall) setOpen(false);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setOpen]); // Añade setOpen como dependencia

  return (
    <aside
      className={`h-screen bg-white border-r border-white transition-all duration-300 ease-in-out flex flex-col
        ${open ? "w-64" : "w-16"}
        fixed top-0 left-0 z-50`}
      onMouseEnter={isSmallScreen ? () => setOpen(true) : undefined}
      onMouseLeave={isSmallScreen ? () => setOpen(false) : undefined}
    >
      {/* Botón de hamburguesa solo en pantallas grandes */}
      {!isSmallScreen && (
        <div className="flex justify-end p-2">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between px-2 pb-4 overflow-y-auto">
        <div>
          <SidebarHeader open={open} />
          <SidebarMenu open={open} />
        </div>
        <SidebarLogout open={open} />
      </div>
    </aside>
  );
}