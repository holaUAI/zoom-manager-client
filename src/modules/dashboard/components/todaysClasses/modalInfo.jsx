import React from 'react';
import { Video, Mail, Star, Copy, ExternalLink, Clock, Calendar, Play, AlertTriangle } from 'lucide-react';

export function ClassDetailsModal({ isOpen, onClose, selectedClass }) {
  if (!isOpen || !selectedClass) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <Video className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-semibold">Detalles de la Clase</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">Información completa de la sesión virtual</p>

        {/* Contenido */}
        <div className="space-y-6">
          {/* Detalles de Horario MEJORADO */}
          <div className="border rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-xl text-gray-800">Detalles de Horario</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fecha y Hora Programada */}
              <div className="relative">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">Programada</span>
                    </div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{selectedClass.scheduledTime || '-'}</p>
                  <p className="text-xs text-gray-500 mt-1">Hora oficial de inicio</p>
                </div>
              </div>

              {/* Hora de Apertura */}
              {(selectedClass.status === "Finalizado" || selectedClass.status === "En curso") && (
                <div className="relative">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-600">Apertura</span>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{selectedClass.openedTime || '-'}</p>
                    {delayOpened && (
                      <div className="mt-2 flex items-center space-x-1">
                        {delayOpened.includes('tarde') ? (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </span>
                        )}
                        <span className={`text-xs font-medium ${
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
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Play className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-600">Inicio</span>
                      </div>
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{selectedClass.startedTime || '-'}</p>
                    {delayStarted && (
                      <div className="mt-2 flex items-center space-x-1">
                        {delayStarted.includes('tarde') ? (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </span>
                        )}
                        <span className={`text-xs font-medium ${
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

            {/* Línea de tiempo visual para clases finalizadas o en curso */}
            {(selectedClass.status === "Finalizado" || selectedClass.status === "En curso") && (
              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-blue-500 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-green-500 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-2/3 w-1/3 h-0.5 bg-purple-500 -translate-y-1/2"></div>
                  
                  <div className="bg-blue-500 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"></div>
                  <div className="bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"></div>
                  <div className="bg-purple-500 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Programada</span>
                  <span className="text-xs text-gray-500">Apertura</span>
                  <span className="text-xs text-gray-500">Inicio</span>
                </div>
              </div>
            )}
          </div>

          {/* Información General y Detalles de Clase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información General */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-lg mb-3">Información General</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Especialidad</label>
                  <p className="text-sm">{selectedClass.specialty || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Sede</label>
                  <p className="text-sm">{selectedClass.sede || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Profesor</label>
                  <p className="text-sm font-semibold">{selectedClass.professor || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email del docente</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedClass.hostEmail || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles de la Clase */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-lg mb-3">Detalles de la Clase</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Número de clase</label>
                  <p className="text-sm">5 de 20 clases</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Puntaje anterior</label>
                  <p className="text-sm flex items-center">
                    4.5 <Star className="h-4 w-4 text-yellow-500 ml-1" />
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Estado de la clase</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      selectedClass.status === "Finalizado"
                        ? "bg-gray-200 text-gray-800"
                        : selectedClass.status === "En curso"
                        ? "bg-green-200 text-green-800"
                        : "bg-orange-200 text-orange-800"
                    }`}>
                    {selectedClass.status}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Link del Zoom</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      value={selectedClass.joinUrl || ''}
                      readOnly
                      className="flex-1 text-xs bg-gray-50 border rounded p-2 font-mono"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedClass.joinUrl)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Copiar link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => window.open(selectedClass.joinUrl, '_blank')}
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center"
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
            <div className="col-span-full border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-lg mb-3">Resumen de la clase</h3>
              <p className="text-sm text-gray-600">Próximamente encontrarás el resumen de esta clase.</p>
            </div>
          )}
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Cerrar modal"
        >
          <span className="sr-only">Cerrar</span>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

