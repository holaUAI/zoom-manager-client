import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Datos simulados
const teachers = [
  { host_id: '1', user_name: 'Ana García', email: 'ana.garcia@colegio.edu' },
  { host_id: '2', user_name: 'Carlos Méndez', email: 'carlos.mendez@colegio.edu' },
  { host_id: '3', user_name: 'Lucía Ramírez', email: 'lucia.ramirez@colegio.edu' },
  { host_id: '4', user_name: 'Jorge López', email: 'jorge.lopez@colegio.edu' },
  { host_id: '5', user_name: 'María Fernández', email: 'maria.fernandez@colegio.edu' },
  { host_id: '6', user_name: 'Pedro Martínez', email: 'pedro.martinez@colegio.edu' },
];

// Datos simulados de reuniones
const meetingsData = {
  '1': [
    { 
      id: 'm1', 
      title: 'Clase de Álgebra Lineal', 
      date: '2025-04-01', 
      time: '10:00 AM', 
      duration: '60 min', 
      participants: 15,
      rating: 4.5,
      delay: '5 min'
    },
    { 
      id: 'm2', 
      title: 'Tutoría Grupal', 
      date: '2025-04-03', 
      time: '2:00 PM', 
      duration: '45 min', 
      participants: 8,
      rating: 3.8,
      delay: '0 min'
    },
  ],
  '2': [
    { 
      id: 'm3', 
      title: 'Repaso de la Revolución Francesa', 
      date: '2025-04-02', 
      time: '11:00 AM', 
      duration: '50 min', 
      participants: 12,
      rating: 4.2,
      delay: '10 min'
    },
    { 
      id: 'm4', 
      title: 'Debate: Guerra Fría', 
      date: '2025-04-04', 
      time: '9:00 AM', 
      duration: '70 min', 
      participants: 20,
      rating: 4.7,
      delay: '0 min'
    },
  ],
  '3': [
    { 
      id: 'm5', 
      title: 'Laboratorio de Química', 
      date: '2025-04-01', 
      time: '3:00 PM', 
      duration: '90 min', 
      participants: 18,
      rating: 4.0,
      delay: '15 min'
    },
  ],
  '4': [
    { 
      id: 'm6', 
      title: 'Grammar Workshop', 
      date: '2025-04-02', 
      time: '1:00 PM', 
      duration: '40 min', 
      participants: 10,
      rating: 3.5,
      delay: '0 min'
    },
    { 
      id: 'm7', 
      title: 'Reading Club', 
      date: '2025-04-05', 
      time: '4:00 PM', 
      duration: '60 min', 
      participants: 7,
      rating: 4.9,
      delay: '2 min'
    },
  ],
};

// Función para calcular el total de tardanzas en minutos
const calculateTotalDelay = (meetings) => {
  return meetings.reduce((total, meeting) => {
    const delayMinutes = parseInt(meeting.delay) || 0;
    return total + delayMinutes;
  }, 0);
};

// Función para calcular el promedio de valoraciones
const calculateAverageRating = (meetings) => {
  if (meetings.length === 0) return 0;
  const sum = meetings.reduce((total, meeting) => total + meeting.rating, 0);
  return sum / meetings.length;
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={`text-xs ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export const TeacherInfo = ({ onSelectTeacher, selectedId, searchTerm = '' }) => {
  const [internalSelectedId, setInternalSelectedId] = useState(null);

  // Filtrar docentes según el término de búsqueda
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return searchTerm ? matchesSearch : true;
  });

  const handleSelect = (hostId) => {
    const newId = internalSelectedId === hostId ? null : hostId;
    setInternalSelectedId(newId);
    onSelectTeacher(newId);
  };

  return (
    <div className="space-y-3">
      {filteredTeachers.length > 0 ? (
        filteredTeachers.map((teacher) => {
          const meetings = meetingsData[teacher.host_id] || [];
          const totalDelay = calculateTotalDelay(meetings);
          const avgRating = calculateAverageRating(meetings);
          
          return (
            <div
              key={teacher.host_id}
              onClick={() => handleSelect(teacher.host_id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-4
                ${selectedId === teacher.host_id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
            >
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400 bg-gray-100 rounded-full p-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800 text-base truncate max-w-[180px]">
                    {highlightMatch(teacher.user_name, searchTerm)}
                  </h3>
                  {totalDelay > 0 && (
                    <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      {totalDelay} min de tardanza
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">
                  {highlightMatch(teacher.email, searchTerm)}
                </p>
                <div className="flex items-center space-x-2">
                  <StarRating rating={avgRating} />
                  <span className="text-xs text-gray-500">
                    ({meetings.length} {meetings.length === 1 ? 'clase' : 'clases'})
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-2 text-gray-500">No se encontraron docentes</p>
          <p className="text-sm text-gray-400">Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
};

// Función helper para resaltar coincidencias de búsqueda
const highlightMatch = (text, searchTerm) => {
  if (!searchTerm) return text;
  
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (index === -1) return text;
  
  const before = text.substring(0, index);
  const match = text.substring(index, index + searchTerm.length);
  const after = text.substring(index + searchTerm.length);
  
  return (
    <>
      {before}
      <span className="bg-yellow-100 text-yellow-800">{match}</span>
      {after}
    </>
  );
};

TeacherInfo.propTypes = {
  onSelectTeacher: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
  searchTerm: PropTypes.string,
};

TeacherInfo.defaultProps = {
  selectedId: null,
  searchTerm: '',
};