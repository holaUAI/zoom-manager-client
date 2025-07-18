import { useState, useEffect } from "react";
import { useParticipantsByMeetingId } from "../../hooks/useGetParticipantsByMeetingId";
import { Search, Users, X } from "lucide-react";

export default function ParticipantsModal({ isOpen, onClose, meetingId }) {
    const { data, isLoading, error } = useParticipantsByMeetingId(meetingId);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredParticipants, setFilteredParticipants] = useState([]);

    useEffect(() => {
        if (data) {
            setFilteredParticipants(data);
        }
    }, [data]);

    useEffect(() => {
        if (!data) return;
        const filtered = data.filter(participant =>
            participant.user_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredParticipants(filtered);
    }, [searchTerm, data]);

    if (!isOpen) return null;

    const formatDateTime = (dateString) => dateString;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <Users className="h-6 w-6" />
                            <div>
                                <h2 className="text-xl font-bold">Participantes</h2>
                                <p className="text-sm opacity-90">{filteredParticipants.length} asistentes</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white hover:text-blue-100 transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10 text-gray-500">Cargando...</div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-10 text-red-500">
                            Error al cargar participantes
                        </div>
                    ) : filteredParticipants.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {filteredParticipants.map((participant, idx) => (
                                <li key={participant.user_id || idx} className="hover:bg-blue-50 transition-colors">
                                    <div className="flex items-center px-4 py-3">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                            {participant.user_name?.charAt(0) || "?"}
                                        </div>
                                        <div className="ml-4 flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {participant.user_name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Se unió: {formatDateTime(participant.join_time)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <Search className="h-10 w-10 text-gray-400 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">Sin resultados</h3>
                            <p className="text-sm text-gray-500 mt-1">Prueba con otro nombre</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 text-right border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
