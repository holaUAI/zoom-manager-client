import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MeetingListByTeacher } from './meetingListByTeacher'; // Importación relativa

export const MeetingModal = ({ hostId, onClose }) => {
  // Efecto para manejar tecla Escape y scroll
  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!hostId) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">Reuniones</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto flex-1 p-4">
          <MeetingListByTeacher hostId={hostId} />
        </div>

        {/* Footer */}
        <div className="border-t p-3 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

MeetingModal.propTypes = {
  hostId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

MeetingModal.defaultProps = {
  hostId: null,
};