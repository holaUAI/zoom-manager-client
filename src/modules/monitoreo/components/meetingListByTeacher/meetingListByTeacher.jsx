import React from 'react';
import PropTypes from 'prop-types';

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

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={`text-sm ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-indigo-600">({rating.toFixed(1)})</span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: 'bg-emerald-100 text-emerald-800',
    upcoming: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  };
  
  const statusText = {
    completed: 'Realizada',
    upcoming: 'Próxima',
    default: 'Programada'
  };

  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[status] || statusStyles.default}`}>
      {statusText[status] || statusText.default}
    </span>
  );
};

export const MeetingListByTeacher = ({ hostId }) => {
  const meetings = meetingsData[hostId] || [];

  if (meetings.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl inline-block">
          <p className="text-md text-indigo-600 font-medium">No hay clases programadas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
          Horario de Clases
        </h2>
        <p className="text-indigo-400 text-sm">Programación académica</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex flex-row bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            {/* Sección izquierda - Información principal */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-indigo-900">{meeting.title}</h3>
                  <StatusBadge status={meeting.status} />
                </div>
                
                <div className="flex items-center text-xs text-indigo-700 mb-1">
                  <svg className="w-3 h-3 mr-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{meeting.date} • {meeting.time}</span>
                </div>
                
                <div className="flex items-center text-xs text-indigo-700 mb-1">
                  <svg className="w-3 h-3 mr-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{meeting.duration}</span>
                </div>
              </div>
              
              <StarRating rating={meeting.rating} />
            </div>
            
            {/* Sección derecha - Información secundaria */}
            <div className="w-24 border-l border-gray-100 p-3 flex flex-col items-center justify-center bg-indigo-50">
              <div className="text-center mb-2">
                <div className="text-xs text-indigo-500 mb-1">Participantes</div>
                <div className="text-lg font-bold text-indigo-700">{meeting.participants}</div>
              </div>
              
              {meeting.delay !== '0 min' && (
                <div className="text-center">
                  <div className="text-[10px] text-rose-600 font-medium">Tardanza</div>
                  <div className="text-sm font-semibold text-rose-600">{meeting.delay}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MeetingListByTeacher.propTypes = {
  hostId: PropTypes.string.isRequired,
};

MeetingListByTeacher.defaultProps = {
  hostId: null,
};