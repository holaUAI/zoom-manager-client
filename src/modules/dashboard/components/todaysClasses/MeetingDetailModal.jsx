import { useState, useEffect } from "react";
import { useMeetingById } from "../../hooks/useGetMeetingById";
import {
    Video, Mail, Star, Copy, ExternalLink,
    Clock, Calendar, Play, AlertTriangle, BookOpen,
    User, Layers, Flag, X
} from "lucide-react";
import ParticipantsModal from "./ParticipantsModal";


export default function MeetingDetailsModal({ isOpen, onClose, meetingId }) {
    const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
    const { data, isLoading, error } = useMeetingById(meetingId);

    if (!isOpen) return null;
    if (isLoading) return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-center text-gray-700">Cargando detalles de la reunión...</p>
            </div>
        </div>
    );
    if (error || !data) return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full">
                <div className="flex justify-center text-red-500">
                    <AlertTriangle className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">Error al cargar</h3>
                <p className="mt-2 text-center text-sm text-gray-600">
                    No pudimos cargar los detalles de la reunión. Por favor intenta nuevamente.
                </p>
                <div className="mt-5 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );

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

    const bodyContent = summary
        ? summary.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "No hay contenido disponible."
        : "No hay contenido disponible.";

    const scheduledTime = start_time?.split(", ")[1] || "00:00";
    const date = start_time?.split(", ")[0] || "00/00/0000";

    const isMeetingStarted = status === "started" || status === "finished";

    const openedTime = isMeetingStarted ? scheduledTime : "Aún no iniciado";
    const startedTime = isMeetingStarted ? scheduledTime : "Esperando apertura de sesión";

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const getStatusText = (status) => {
        switch (status) {
            case "finished":
                return "Finalizada";
            case "started":
                return "En curso";
            default:
                return "Pendiente";
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            {/* Modal de participantes */}
            <ParticipantsModal
                isOpen={isParticipantsModalOpen}
                onClose={() => setIsParticipantsModalOpen(false)}
                meetingId={meetingId}
            />
            {/* Modal principal más delgado */}
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Encabezado */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center space-x-3">
                                <Video className="h-6 w-6" />
                                <h2 className="text-2xl font-bold">Detalles de la Clase</h2>
                            </div>
                            <p className="mt-1 text-blue-100">Información completa de la sesión virtual</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-blue-200 transition-colors p-1"
                            aria-label="Cerrar modal"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Detalles de Horario */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-3 mb-5">
                            <Clock className="h-6 w-6 text-blue-600" />
                            <h3 className="font-semibold text-xl text-gray-800">Detalles de Horario</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Tarjeta de horario programado */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-600">Programada</span>
                                    </div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                </div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {date} <span className="text-blue-600">{scheduledTime}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Horario programado</p>
                            </div>

                            {/* Tarjeta de apertura de sesión */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-medium text-gray-600">Apertura</span>
                                    </div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {openedTime}
                                </p>
                                {delay_min > 0 && (
                                    <div className="mt-2 text-xs text-orange-600 flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3" />
                                        <span>Entró {delay_min} minutos tarde</span>
                                    </div>
                                )}
                            </div>

                            {/* Tarjeta de inicio de sesión */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <Play className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-600">Inicio</span>
                                    </div>
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                </div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {startedTime}
                                </p>
                                {delay_min > 0 && (
                                    <div className="mt-2 text-xs text-orange-600 flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3" />
                                        <span>Entró {delay_min} minutos tarde</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info General y Detalles */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sección de Información General */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                            <div className="flex items-center space-x-3 mb-5">
                                <BookOpen className="h-6 w-6 text-green-600" />
                                <h3 className="font-semibold text-xl text-gray-800">Información General</h3>
                            </div>
                            <div className="space-y-4">
                                {/* Tarjeta de tema */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Layers className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-medium text-gray-600">Tema de la clase</span>
                                    </div>
                                    <p className="text-base font-semibold text-gray-800">{topic}</p>
                                </div>

                                {/* Tarjeta de email del docente */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Mail className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-medium text-gray-600">Email del docente</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-base font-semibold text-gray-800">{host_email}</p>
                                        <button
                                            onClick={() => copyToClipboard(host_email)}
                                            className="text-gray-500 hover:text-green-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                            title="Copiar email"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Botón de Participantes */}
                                <button
                                    onClick={() => setIsParticipantsModalOpen(true)}
                                    className="w-full bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center space-x-4 text-left group hover:bg-green-50"
                                >
                                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                                        <User className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800">Participantes</h4>
                                        <p className="text-sm text-gray-500">Ver lista completa de asistentes</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Sección de Detalles de la Clase */}
                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-200">
                            <div className="flex items-center space-x-3 mb-5">
                                <Flag className="h-6 w-6 text-purple-600" />
                                <h3 className="font-semibold text-xl text-gray-800">Detalles de la Clase</h3>
                            </div>
                            <div className="space-y-4">
                                {/* Tarjeta de puntaje */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Star className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-600">Puntaje anterior</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-2xl font-bold text-gray-800">4.5</span>
                                        <div className="ml-2 flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Tarjeta de estado */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Clock className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-600">Estado</span>
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status === "finished"
                                            ? "bg-gray-100 text-gray-800"
                                            : status === "started"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-orange-100 text-orange-800"
                                        }`}>
                                        {getStatusText(status)}
                                    </span>
                                </div>

                                {/* Tarjeta de link de Zoom */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <Video className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-600">Link del Zoom</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => copyToClipboard(join_url)}
                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                                title="Copiar link"
                                            >
                                                <Copy className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => window.open(join_url, "_blank")}
                                            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-md transition-all"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Unirse a la clase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resumen (solo si la clase finalizó) */}
                    {status === "finished" && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                            <div className="flex items-center space-x-3 mb-5">
                                <BookOpen className="h-6 w-6 text-amber-600" />
                                <h3 className="font-semibold text-xl text-gray-800">Resumen de la clase</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                {summary ? (
                                    <div
                                        className="prose max-w-none text-sm"
                                        dangerouslySetInnerHTML={{ __html: bodyContent }}
                                    />
                                ) : (
                                    <div className="text-center py-6">
                                        <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">
                                            Próximamente encontrarás el resumen de esta clase.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pie de página */}
                <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        Cerrar detalles
                    </button>
                </div>
            </div>
        </div>
    );
}