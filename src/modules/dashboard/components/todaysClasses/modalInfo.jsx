import React, { useState } from 'react';
import {
  Video,
  Mail,
  Star,
  Copy,
  ExternalLink,
  Clock,
  Calendar,
  Play,
  AlertTriangle,
  BookOpen,
  User,
  MapPin,
  Layers,
  Flag
} from 'lucide-react';

export function ClassDetailsModal({ isOpen, onClose, selectedClass }) {
  const [showParticipants, setShowParticipants] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen || !selectedClass) return null;

  // Función para copiar link al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  };

  // Función auxiliar para calcular minutos de diferencia entre horas
  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (modifier === 'a.m.' && hours === 12) hours = 0;
    if (modifier === 'p.m.' && hours !== 12) hours += 12;
    return new Date(1970, 0, 1, hours, minutes);
  };

  const getDelayText = (scheduled, actual) => {
    if (!scheduled || !actual) return '';
    const diff = Math.round((actual - scheduled) / 60000);
    return diff > 0 ? `${diff} minuto${diff !== 1 ? 's' : ''} tarde` : 'A tiempo';
  };

  const scheduled = selectedClass.scheduledTime ? parseTime(selectedClass.scheduledTime) : null;
  const opened = selectedClass.openedTime ? parseTime(selectedClass.openedTime) : null;
  const started = selectedClass.startedTime ? parseTime(selectedClass.startedTime) : null;
  const delayOpened = scheduled && opened ? getDelayText(scheduled, opened) : '';
  const delayStarted = scheduled && started ? getDelayText(scheduled, started) : '';

  // Filtrado de participantes
  const filteredParticipants = selectedClass.participants
    ? selectedClass.participants.filter(p =>
        p.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal principal */}
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto p-4 relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2">
          <Video className="h-4 w-4 text-gray-700" />
          <h2 className="text-md font-semibold">Detalles de la Clase</h2>
        </div>
        <p className="text-xs text-gray-600 mb-4">Información completa de la sesión virtual</p>

        {/* Contenido */}
        <div className="space-y-4">
          {/* Detalles de Horario */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg text-gray-800">Detalles de Horario</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fecha y Hora Programada */}
              <div className="relative">
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-600">Programada</span>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedClass.date || '-'} {selectedClass.scheduledTime || ''}
                  </p>
                  <p className="text-2xs text-gray-500 mt-1">Horario programado</p>
                </div>
              </div>
              {/* Hora de Apertura */}
              {(selectedClass.status === "Finalizado" || selectedClass.status === "En curso") && (
                <div className="relative">
                  <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-gray-600">Apertura de sesión</span>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{selectedClass.openedTime || '-'}</p>
                    {delayOpened && (
                      <div className="mt-1 flex items-center space-x-1">
                        {delayOpened.includes('tarde') ? (
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                        ) : (
                          <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xs">✓</span>
                          </span>
                        )}
                        <span className={`text-3xs font-medium ${
                          delayOpened.includes('tarde') ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {delayOpened.includes('tarde') ? `Entró ${delayOpened}` : 'Entró a tiempo'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Hora de Inicio */}
              {(selectedClass.status === "Finalizado" || selectedClass.status === "En curso") && (
                <div className="relative">
                  <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Play className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-medium text-gray-600">Inicio de la sesión</span>
                      </div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{selectedClass.startedTime || '-'}</p>
                    {delayStarted && (
                      <div className="mt-1 flex items-center space-x-1">
                        {delayStarted.includes('tarde') ? (
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                        ) : (
                          <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xs">✓</span>
                          </span>
                        )}
                        <span className={`text-3xs font-medium ${
                          delayStarted.includes('tarde') ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {delayStarted.includes('tarde') ? `Inició ${delayStarted}` : 'Inició a tiempo'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Información General y Detalles de Clase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Información General */}
            <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg text-gray-800">Información General</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Layers className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-600">Especialidad</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedClass.specialty || '-'}</p>
                </div>
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-600">Sede</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedClass.sede || '-'}</p>
                </div>
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <User className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-600">Profesor</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedClass.professor || '-'}</p>
                </div>
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-600">Email del docente</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedClass.hostEmail || '-'}</p>
                </div>
                {/* Botón para mostrar participantes */}
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setShowParticipants(true)}
                    className="w-full text-center text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center justify-center space-x-1"
                  >
                    <User className="h-3 w-3" />
                    <span>Ver participantes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Detalles de la Clase */}
            <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
              <div className="flex items-center space-x-2 mb-4">
                <Flag className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg text-gray-800">Detalles de la Clase</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Layers className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-600">Número de clase</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">5 de 20 clases</p>
                </div>
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-600">Puntaje anterior</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 flex items-center">
                    4.5 <Star className="h-3 w-3 text-yellow-500 ml-1 fill-yellow-500" />
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-600">Estado de la clase</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium ${
                      selectedClass.status === "Finalizado"
                        ? "bg-gray-100 text-gray-800"
                        : selectedClass.status === "En curso"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}>
                    {selectedClass.status}
                  </span>
                </div>
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Video className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-600">Link del Zoom</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={selectedClass.joinUrl || ''}
                      readOnly
                      className="flex-1 text-xs bg-gray-50 border rounded p-1.5 font-mono"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedClass.joinUrl)}
                      className="text-gray-600 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100"
                      title="Copiar link"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => window.open(selectedClass.joinUrl, '_blank')}
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

          {/* Resumen de la clase - Solo para clases finalizadas */}
          {selectedClass.status === "Finalizado" && (
            <div className="border rounded-lg p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-lg text-gray-800">Resumen de la clase</h3>
              </div>
              <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-600">Próximamente encontrarás el resumen de esta clase.</p>
              </div>
            </div>
          )}
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
          aria-label="Cerrar modal"
        >
          <span className="sr-only">Cerrar</span>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      {/* Segundo Modal - Lista de Participantes */}
      {showParticipants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 relative transform transition-all duration-300 ease-in-out scale-100">
            <h3 className="text-lg font-semibold mb-2">Lista de Participantes</h3>

            {/* Barra de búsqueda */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Lista de participantes con scroll */}
            <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200 pr-1">
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant, index) => (
                  <li key={index} className="py-2">
                    <p className="text-sm font-medium text-gray-800">{participant.user_name}</p>
                    <p className="text-xs text-gray-500 truncate">{participant.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Se unió: {participant.join_time}</p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-4 text-center">No se encontraron participantes.</p>
              )}
            </ul>

            {/* Botón de cerrar */}
            <button
              onClick={() => setShowParticipants(false)}
              className="mt-4 ml-auto block text-gray-500 hover:text-gray-800 text-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}