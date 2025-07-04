import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../shared/atoms/sidebarAtom";
import Sidebar from "./sidebar/Sidebar";

export default function Layout({ children }) {
    const [sidebarOpen] = useAtom(sidebarOpenAtom);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className={`flex-1 overflow-y-auto ${sidebarOpen ? "m-5" : "m-5"}`}>
                {children}
            </main>
        </div>
    );
}
