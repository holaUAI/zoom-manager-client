import { useAtomValue } from "jotai";
import { authAtom } from "../../../auth/atoms/authAtom";
import { useEffect, useState } from "react";

export default function SidebarHeader({ open }) {
  const { user } = useAtomValue(authAtom);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detectar el viewport al cargar y en cambios de tamaño
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1366 && window.innerHeight <= 639);
    };
    checkScreenSize(); // Verificar al inicio
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.email
  )}&background=0358CB&color=FFFFFF`;

  return (
    <div className="sidebar-header">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="size-10 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-green-500 border-white" />
      </div>
      {/* Mostrar nombre y correo solo si: 
          - La sidebar está expandida (open) Y es pantalla pequeña, O
          - Es pantalla grande (sin importar `open`)
      */}
      {((isSmallScreen && open) || !isSmallScreen) && (
        <div className="flex flex-col">
          {open &&
            <>
              <span className="font-semibold">{user?.username}</span>
              <span className="text-xs text-gray-500">{user?.email}</span>
            </>
          }
        </div>
      )
      }
    </div >
  );
}