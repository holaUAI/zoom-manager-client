import { useState } from "react";
import MeetingList from "../components/meetingFiltersList/MeetingFiltersList";
import { MonitoreoPage } from "../../monitoreo/pages/monitoreo";
import { Users, Video } from "lucide-react";

export default function ReunionesPage() {
    const [activeTab, setActiveTab] = useState("reuniones");

    return (
        <div className="p-4">
            {/* Toggle buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("reuniones")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                        ${activeTab === "reuniones" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    <Video size={20} />
                    Reuniones
                </button>

                <button
                    onClick={() => setActiveTab("profesores")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                        ${activeTab === "profesores" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    <Users size={20} />
                    Profesores
                </button>
            </div>

            {/* Contenido dinámico */}
            {activeTab === "reuniones" ? <MeetingList /> : <MonitoreoPage />}
        </div>
    );
}
