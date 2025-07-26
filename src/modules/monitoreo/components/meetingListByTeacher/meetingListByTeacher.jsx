import React from 'react';
import PropTypes from 'prop-types';
import { useMeetingsByHostId } from '../../hooks/useMeetingsByHostId';

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-sm ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
      >
        ★
      </span>
    ))}
    <span className="ml-1 text-xs text-indigo-600">
      ({rating ? rating.toFixed(1) : '0'})
    </span>
  </div>
);

export const MeetingListByTeacher = ({ hostId }) => {
  const { data, isLoading } = useMeetingsByHostId(hostId);

  if (isLoading) {
    return <p className="text-center text-indigo-600">Cargando reuniones...</p>;
  }

  const meetings = data?.data || [];

  if (meetings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-md text-indigo-600 font-medium">No hay clases programadas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold text-center text-indigo-700">
        Horario de Clases
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.meeting_id}
            className="flex flex-row bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-indigo-900">{meeting.topic}</h3>
                  <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {meeting.status}
                  </span>
                </div>
                <div className="text-xs text-indigo-700 mb-1">
                  Fecha: {meeting.start_time}
                </div>
                <div className="text-xs text-indigo-700 mb-1">
                  Duración: {meeting.duration} min
                </div>
              </div>
              <StarRating rating={meeting.score ?? 0} />
            </div>
            <div className="w-24 border-l border-gray-100 p-3 flex flex-col items-center justify-center bg-indigo-50">
              <div className="text-center mb-2">
                <div className="text-xs text-indigo-500 mb-1">Participantes</div>
                <div className="text-lg font-bold text-indigo-700">{meeting.num_participants}</div>
              </div>
              {meeting.delay_min > 0 && (
                <div className="text-center">
                  <div className="text-[10px] text-rose-600 font-medium">Tardanza</div>
                  <div className="text-sm font-semibold text-rose-600">{meeting.delay_min} min</div>
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