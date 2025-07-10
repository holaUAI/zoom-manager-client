import { useState } from "react";
import { useMeetings } from "../../hooks/useMeetings";
import { CalendarDays, Clock, WifiOff, RotateCw } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { ClassDetailsModal } from "./modalInfo";

const TABS = [
    { 
        key: "en_curso", 
        label: "En curso", 
        activeClass: "bg-green-500 text-white", 
        inactiveClass: "bg-green-100 text-green-800 hover:bg-green-200" 
    },
    { 
        key: "finalizado", 
        label: "Finalizado", 
        activeClass: "bg-gray-500 text-white", 
        inactiveClass: "bg-gray-100 text-gray-800 hover:bg-gray-200" 
    },
    { 
        key: "proximo", 
        label: "Próximo", 
        activeClass: "bg-blue-500 text-white", 
        inactiveClass: "bg-blue-100 text-blue-800 hover:bg-blue-200" 
    },
];

function agruparPorEstado(reuniones) {
    const ahora = new Date();
    const grupos = {
        en_curso: [],
        finalizado: [],
        proximo: [],
    };

    reuniones.forEach((r) => {
        const inicio = new Date(r.start_time);
        const fin = new Date(inicio.getTime() + r.duration * 60000);

        if (inicio <= ahora && ahora <= fin) {
            grupos.en_curso.push(r);
        } else if (ahora > fin) {
            grupos.finalizado.push(r);
        } else {
            grupos.proximo.push(r);
        }
    });

    return grupos;
}

function convertToModalFormat(meeting) {
    const inicio = new Date(meeting.start_time);
    const fin = new Date(inicio.getTime() + meeting.duration * 60000);
    
    const ahora = new Date();
    let status;
    if (inicio <= ahora && ahora <= fin) {
        status = "En curso";
    } else if (ahora > fin) {
        status = "Finalizado";
    } else {
        status = "Próximo";
    }

    return {
        id: meeting.id,
        scheduledTime: inicio.toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit",
            hour12: true 
        }).replace(/AM|PM/i, match => match.toLowerCase() === 'am' ? 'a.m.' : 'p.m.'),
        openedTime: status !== "Próximo" ? inicio.toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit",
            hour12: true 
        }).replace(/AM|PM/i, match => match.toLowerCase() === 'am' ? 'a.m.' : 'p.m.') : null,
        startedTime: status !== "Próximo" ? inicio.toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit",
            hour12: true 
        }).replace(/AM|PM/i, match => match.toLowerCase() === 'am' ? 'a.m.' : 'p.m.') : null,
        specialty: "Especialidad UAI",
        sede: meeting.timezone || "Sede Principal",
        professor: "Docente UAI",
        hostEmail: meeting.host_email || "docente@uai.edu",
        status: status,
        joinUrl: meeting.join_url || ""
    };
}

export default function TodaysClasses() {
    const { data, isLoading, error } = useMeetings();
    const [tab, setTab] = useState("en_curso");
    const [selectedClass, setSelectedClass] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClassClick = (meeting) => {
        const classData = convertToModalFormat(meeting);
        setSelectedClass(classData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClass(null);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center justify-center h-64">
                <div className="relative">
                    <RotateCw 
                        size={48} 
                        className="animate-spin text-blue-500" 
                    />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-75"></div>
                </div>
                <p className="text-lg text-gray-600 mt-4 animate-pulse">Cargando clases...</p>
            </div>
        );
    }

    if (error || !Array.isArray(data)) {
        return (
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center justify-center h-64 animate-fade-in">
                <div className="relative mb-4">
                    <WifiOff size={48} className="text-red-500" />
                    <div className="absolute -inset-2 bg-red-100 rounded-full opacity-50 animate-pulse"></div>
                </div>
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

    const grupos = agruparPorEstado(data);

    return (
        <>
            <div className="bg-white rounded-xl shadow p-5">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <CalendarDays size={20} /> Clases de Hoy
                </h2>

                <div className="grid grid-cols-3 gap-2 mb-4 text-sm font-medium">
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
                    {grupos[tab]?.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No hay clases {TABS.find(t => t.key === tab)?.label.toLowerCase()}
                        </p>
                    )}

                    {grupos[tab]?.map((r) => {
                        const inicio = new Date(r.start_time);
                        const fin = new Date(inicio.getTime() + r.duration * 60000);

                        return (
                            <div
                                key={r.id}
                                onClick={() => handleClassClick(r)}
                                className={cn(
                                    "rounded-xl p-4 border-l-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
                                    tab === "en_curso" ? "border-green-500 bg-green-50" :
                                    tab === "finalizado" ? "border-gray-500 bg-gray-50" :
                                    "border-blue-500 bg-blue-50"
                                )}
                            >
                                <h3 className="font-semibold mb-1">{r.topic}</h3>

                                <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                                    <span>👤</span>
                                    <span>Docente UAI</span>
                                    <span>📍 Aula Virtual</span>
                                </div>

                                <p className="text-sm text-gray-500 mb-1">Sede: {r.timezone}</p>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-1 text-gray-500">
                                        <Clock size={14} />
                                        Desde: {inicio.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} Hasta:{" "}
                                        {fin.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>

                                    <span
                                        className={cn(
                                            "text-white text-xs font-semibold px-2 py-1 rounded-full",
                                            tab === "en_curso" ? "bg-green-500" :
                                            tab === "finalizado" ? "bg-gray-500" :
                                            "bg-blue-500"
                                        )}
                                    >
                                        {TABS.find(t => t.key === tab)?.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ClassDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selectedClass={selectedClass}
            />
        </>
    );
}