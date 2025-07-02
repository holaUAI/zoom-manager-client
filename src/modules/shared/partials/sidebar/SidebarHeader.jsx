import { useAtomValue } from "jotai";
import { authAtom } from "../../../auth/atoms/authAtom";

export default function SidebarHeader({ open }) {
    const { user } = useAtomValue(authAtom);
  
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.email || "Usuario"
    )}&background=0358CB&color=FFFFFF`;
  
    return (
      <div className="flex items-center gap-3 mb-6 pl-2">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="size-10 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-green-500 border-white" />
        </div>
        {open && (
          <div className="flex flex-col">
            <span className="font-semibold">username</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        )}
      </div>
    );
  }
  
