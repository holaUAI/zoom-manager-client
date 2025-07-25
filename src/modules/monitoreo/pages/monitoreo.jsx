import { useState, useEffect } from 'react';
import { TeacherInfo } from '../components/teacherInfo/teacherInfo';
import { MeetingListByTeacher } from '../components/meetingListByTeacher/meetingListByTeacher';
import { MeetingModal } from '../components/meetingListByTeacher/MeetingModal';

export const MonitoreoPage = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth <= 958;
      setIsMobile(isMobileView);
      
      if (!isMobileView && showModal) {
        setShowModal(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [showModal]);

  const handleSelectTeacher = (teacherId) => {
    const newSelection = selectedTeacherId === teacherId ? null : teacherId;
    setSelectedTeacherId(newSelection);
    
    if (isMobile && newSelection) {
      setShowModal(true);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Panel de profesores - siempre visible */}
      <div className={`${isMobile ? 'w-full' : 'w-1/3'} bg-white shadow-lg p-6 overflow-y-auto flex flex-col`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Docentes
          </h2>
          
          {/* Barra de búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar docente por nombre..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Lista de profesores con filtro de búsqueda */}
        <div className="flex-1 overflow-y-auto">
          <TeacherInfo 
            onSelectTeacher={handleSelectTeacher} 
            selectedId={isMobile ? null : selectedTeacherId}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      {/* Panel de reuniones - solo en desktop */}
      {!isMobile && (
        <div className="w-2/3 p-6 bg-gray-100 overflow-y-auto">
          {selectedTeacherId ? (
            <MeetingListByTeacher hostId={selectedTeacherId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500 italic">
                Selecciona un docente para ver sus reuniones
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal para móviles */}
      {isMobile && showModal && selectedTeacherId && (
        <MeetingModal 
          hostId={selectedTeacherId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};