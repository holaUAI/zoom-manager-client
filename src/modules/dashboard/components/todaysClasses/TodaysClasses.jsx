import { useState } from "react";
import { useGroupedTodayMeetings } from "../../hooks/useMeetingAllToday";
import { CalendarDays, Clock, WifiOff, RotateCw } from "lucide-react";
import { cn } from "../../../../lib/utils";
import MeetingDetailsModal from "./MeetingDetailModal";

const TABS = [
    {
        key: "started",
        label: "En curso",
        activeClass: "bg-green-500 text-white",
        inactiveClass: "bg-green-100 text-green-800 hover:bg-green-200"
    },
    {
        key: "finished",
        label: "Finalizado",
        activeClass: "bg-gray-500 text-white",
        inactiveClass: "bg-gray-100 text-gray-800 hover:bg-gray-200"
    },
    {
        key: "pending",
        label: "Próximo",
        activeClass: "bg-blue-500 text-white",
        inactiveClass: "bg-blue-100 text-blue-800 hover:bg-blue-200"
    },
    {
        key: "not_open",
        label: "No Aperturado",
        activeClass: "bg-red-500 text-white",
        inactiveClass: "bg-red-100 text-red-800 hover:bg-red-200"
    }
];

export default function TodaysClasses() {
    const { data, isLoading, error } = useGroupedTodayMeetings();
    const [tab, setTab] = useState("started");

    const [meetingId, setMeetingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDetails = (id) => {
        setMeetingId(id);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center justify-center h-64">
                <RotateCw size={48} className="animate-spin text-blue-500" />
                <p className="text-lg text-gray-600 mt-4 animate-pulse">Cargando clases...</p>
            </div>
        );
    }

    if (error || !data || typeof data !== "object") {
        return (
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center justify-center h-64 animate-fade-in">
                <WifiOff size={48} className="text-red-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Buscando conexión</h3>
                <p className="text-gray-600 text-center max-w-xs">
                    Estamos teniendo problemas para conectarnos al servidor. Por favor verifica tu conexión a internet.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                    <RotateCw size={16} />
                    Reintentar
                </button>
            </div>
        );
    }

    const meetings = data[tab] || [];

    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CalendarDays size={20} /> Clases de Hoy
            </h2>

            <div className="grid grid-cols-4 gap-2 mb-4 text-sm font-medium">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={cn(
                            "py-2 rounded-md text-center transition",
                            tab === t.key ? t.activeClass : t.inactiveClass
                        )}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {meetings.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No hay clases {TABS.find(t => t.key === tab)?.label.toLowerCase()}
                    </p>
                ) : (
                    meetings.map((r) => {
                        const inicio = new Date(r.start_time);
                        const fin = new Date(inicio.getTime() + r.duration * 60000);

                        return (
                            <div
                                key={r.uuid}
                                onClick={() => openDetails(r.meeting_id)} // ✅ esto activa el modal con el ID correcto
                                className={cn(
                                    "rounded-xl p-4 border-l-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
                                    tab === "started" ? "border-green-500 bg-green-50" :
                                        tab === "finished" ? "border-gray-500 bg-gray-50" :
                                            tab === "pending" ? "border-blue-500 bg-blue-50" :
                                                "border-red-500 bg-red-50"
                                )}
                            >
                                <h3 className="font-semibold mb-1">{r.topic}</h3>

                                <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                                    <span>👤</span>
                                    <span>{r.host_email}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-1 text-gray-500">
                                        <Clock size={14} />
                                        Desde: {inicio.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} Hasta:{" "}
                                        {fin.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    <span className={cn(
                                        "text-white text-xs font-semibold px-2 py-1 rounded-full",
                                        tab === "started" ? "bg-green-500" :
                                            tab === "finished" ? "bg-gray-500" :
                                                tab === "pending" ? "bg-blue-500" :
                                                    "bg-red-500"
                                    )}>
                                        {TABS.find(t => t.key === tab)?.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <MeetingDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meetingId={meetingId}
            />
        </div>
    );
}
