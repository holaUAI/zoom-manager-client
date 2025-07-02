import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../shared/atoms/sidebarAtom";
import Sidebar from "./sidebar/Sidebar";

export default function Layout({ children }) {
    const [sidebarOpen] = useAtom(sidebarOpenAtom);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className={`flex-1 p-4 overflow-y-auto ${sidebarOpen ? "ml-64" : "ml-0"}`}>
                {children}
            </main>
        </div>
    );
}
