import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../shared/atoms/sidebarAtom";
import Sidebar from "./sidebar/Sidebar";

export default function Layout({ children }) {
    const [sidebarOpen] = useAtom(sidebarOpenAtom);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
                sidebarOpen ? "ml-64 pl-5" : "ml-16 pl-5"
            } pr-5 pt-5`}>
                {children}
            </main>
        </div>
    );
}