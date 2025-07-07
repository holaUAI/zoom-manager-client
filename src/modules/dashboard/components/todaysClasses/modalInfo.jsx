import React from 'react';
import { Video, Mail, Star, Copy, ExternalLink } from 'lucide-react';

export function ClassDetailsModal({ isOpen, onClose, selectedClass }) {
  if (!isOpen || !selectedClass) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  };

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

        <div className="space-y-6">
          {/* Detalles de Horario */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium text-lg mb-4">Detalles de Horario</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Fecha y Hora de Programación de Clase</label>
                <p className="text-sm mt-1">{selectedClass.scheduledTime || '-'}</p>
              </div>

              {(selectedClass.status === "Finalizado" || selectedClass.status === "En curso") && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Hora de Apertura</label>
                    <p className="text-sm mt-1 flex items-center justify-between">
                      {selectedClass.openedTime || '-'}
                      {delayOpened && <span className="text-xs text-red-600 ml-2">Entró {delayOpened}</span>}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Hora de Inicio de Clase</label>
                    <p className="text-sm mt-1 flex items-center justify-between">
                      {selectedClass.startedTime || '-'}
                      {delayStarted && <span className="text-xs text-red-600 ml-2">Inició {delayStarted}</span>}
                    </p>
                  </div>
                </>
              )}
            </div>
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
