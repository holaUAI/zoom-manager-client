import { useState } from "react";
import { useMeetings } from "../../hooks/useMeetings";
import { CalendarDays, Clock } from "lucide-react";
import { cn } from "../../../../lib/utils";

const TABS = [
    { key: "en_curso", label: "En curso", color: "bg-green-100", badge: "bg-green-600" },
    { key: "finalizado", label: "Finalizado", color: "bg-gray-100", badge: "bg-slate-400" },
    { key: "proximo", label: "Próximo", color: "bg-orange-100", badge: "bg-orange-500" },
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

export default function TodaysClasses() {
    const { data, isLoading } = useMeetings();
    const [tab, setTab] = useState("en_curso");

    if (isLoading) return <p>Cargando clases...</p>;
    if (!Array.isArray(data)) return <p>Error al cargar reuniones</p>;

    const grupos = agruparPorEstado(data);

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
                            tab === t.key ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
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
                            className={cn("rounded-xl p-4 border-l-4", TABS.find(t => t.key === tab).color)}
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
                                        TABS.find(t => t.key === tab).badge
                                    )}
                                >
                                    {TABS.find(t => t.key === tab).label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
