import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHostsMoreInfo } from '../../hooks/useHostsMoreInfo';

const StarRating = ({ rating }) => (
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

export const TeacherInfo = ({ onSelectTeacher, selectedId, searchTerm = '' }) => {
  const [internalSelectedId, setInternalSelectedId] = useState(null);
  const { data, isLoading } = useHostsMoreInfo();

  if (isLoading) return <p>Cargando docentes...</p>;

  const teachers = data?.data || [];

  // Filtrar docentes según el término de búsqueda
  const filteredTeachers = teachers.filter((teacher) => {
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
        filteredTeachers.map((teacher) => (
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
                {teacher.amount_delay_min > 0 && (
                  <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {teacher.amount_delay_min} min de tardanza
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate mb-1">
                {highlightMatch(teacher.email, searchTerm)}
              </p>
              <div className="flex items-center space-x-2">
                <StarRating rating={teacher.average} />
                <span className="text-xs text-gray-500">
                  ({teacher.num_reuniones} {teacher.num_reuniones === 1 ? 'clase' : 'clases'})
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No se encontraron docentes</div>
      )}
    </div>
  );
};

// helper para resaltar búsqueda
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