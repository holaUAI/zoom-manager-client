import { useMeetingById } from "../../hooks/useGetMeetingById";

import {
    Video, Mail, Star, Copy, ExternalLink,
    Clock, Calendar, Play, AlertTriangle, BookOpen,
    User, Layers, Flag,
} from "lucide-react";

export default function MeetingDetailsModal({ isOpen, onClose, meetingId }) {
    const { data, isLoading, error } = useMeetingById(meetingId);

    if (!isOpen) return null;
    if (isLoading) return <div></div>;
    if (error || !data) return <div>Error al cargar</div>;

    const {
        topic,
        duration,
        delay_min,
        status,
        host_email,
        start_time,
        join_url,
        summary,
    } = data;
    const bodyContent = summary.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "No hay contenido disponible.";


    const scheduledTime = start_time?.split(", ")[1] || "00:00";
    const date = start_time?.split(", ")[0] || "00/00/0000";
    const openedTime = scheduledTime;
    const startedTime = scheduledTime;
    const delayStarted = "A tiempo";

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto p-4 relative">
                <div className="flex items-center space-x-2 mb-2">
                    <Video className="h-4 w-4 text-gray-700" />
                    <h2 className="text-md font-semibold">Detalles de la Clase</h2>
                </div>

                <p className="text-xs text-gray-600 mb-4">Información completa de la sesión virtual</p>

                <div className="space-y-4">
                    {/* Detalles de Horario */}
                    <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                        <div className="flex items-center space-x-2 mb-4">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-lg text-gray-800">Detalles de Horario</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                        <span className="text-xs font-medium text-gray-600">Programada</span>
                                    </div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {date} {scheduledTime}
                                </p>
                                <p className="text-2xs text-gray-500 mt-1">Horario programado</p>
                            </div>

                            <div className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4 text-green-600" />
                                        <span className="text-xs font-medium text-gray-600">Apertura de sesión</span>
                                    </div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">{openedTime}</p>
                                <div className="mt-1 text-3xs text-orange-600 flex items-center gap-1">
                                    {delay_min > 0 &&
                                        <>
                                            <AlertTriangle className="h-3 w-3" />
                                            Entró {delay_min} minutos tarde
                                        </>
                                    }
                                </div>
                            </div>

                            <div className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-1">
                                        <Play className="h-4 w-4 text-purple-600" />
                                        <span className="text-xs font-medium text-gray-600">Inicio de la sesión</span>
                                    </div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">{startedTime}</p>
                                <p className="mt-1 text-3xs text-green-600">Inició {delayStarted}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info General y Detalles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                            <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg text-gray-800">Información General</h3>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { icon: Layers, label: "Tema", value: topic },
                                    { icon: Mail, label: "Email del docente", value: host_email },
                                ].map(({ icon: Icon, label, value }, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center space-x-2 mb-1">
                                            <Icon className="h-4 w-4 text-green-600" />
                                            <span className="text-xs font-medium text-gray-600">{label}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                            <div className="flex items-center space-x-2 mb-4">
                                <Flag className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg text-gray-800">Detalles de la Clase</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Star className="h-4 w-4 text-purple-600" />
                                        <span className="text-xs font-medium text-gray-600">Puntaje anterior</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800 flex items-center">
                                        4.5 <Star className="h-3 w-3 text-yellow-500 ml-1 fill-yellow-500" />
                                    </p>
                                </div>

                                <div className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        <span className="text-xs font-medium text-gray-600">Estado de la clase</span>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium ${status === "finished"
                                        ? "bg-gray-100 text-gray-800"
                                        : status === "started"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-orange-100 text-orange-800"
                                        }`}>
                                        {status}
                                    </span>
                                </div>

                                <div className="bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Video className="h-4 w-4 text-purple-600" />
                                        <span className="text-xs font-medium text-gray-600">Link del Zoom</span>
                                    </div>
                                    <div className="flex items-center space-x-2">

                                        <button
                                            onClick={() => copyToClipboard(join_url)}
                                            className="text-gray-600 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100"
                                            title="Copiar link"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </button>
                                        <button
                                            onClick={() => window.open(join_url, "_blank")}
                                            className="bg-purple-600 text-white text-xs px-2 py-1.5 rounded flex items-center hover:bg-purple-700 transition-colors"
                                        >
                                            <ExternalLink className="h-3 w-3 mr-1" />
                                            Unirse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resumen */}
                    {status === "finished" && (
                        <div className="border rounded-lg p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                            <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="h-5 w-5 text-amber-600" />
                                <h3 className="font-semibold text-lg text-gray-800">Resumen de la clase</h3>
                            </div>
                            <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                {summary ? (
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: bodyContent }}
                                    />
                                ) : (
                                    <p className="text-xs text-gray-600">
                                        Próximamente encontrarás el resumen de esta clase.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
                    aria-label="Cerrar modal"
                >
                    <span className="sr-only">Cerrar</span>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}
