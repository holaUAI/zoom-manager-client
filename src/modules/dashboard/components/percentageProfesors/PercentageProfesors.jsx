import React, { useMemo } from 'react';
import { Clock, ChevronRight } from 'lucide-react';

const TopTardyTeachers = ({ teacherData = null }) => {
  // Datos de ejemplo si no se proporcionan datos externos
  const defaultData = [
    { id: 1, name: 'Prof. García', department: 'Matemáticas', tardiness: 15, classes: 20, avgDelay: 12 },
    { id: 2, name: 'Prof. López', department: 'Historia', tardiness: 8, classes: 18, avgDelay: 8 },
    { id: 3, name: 'Prof. Martínez', department: 'Ciencias', tardiness: 22, classes: 25, avgDelay: 15 },
    { id: 4, name: 'Prof. Rodríguez', department: 'Literatura', tardiness: 5, classes: 16, avgDelay: 6 },
    { id: 5, name: 'Prof. Hernández', department: 'Inglés', tardiness: 18, classes: 22, avgDelay: 10 },
    { id: 8, name: 'Rengifo Hermenegildo Jose', department: 'Gestión y desarrollo humano', tardiness: 25, classes: 28, avgDelay: 18 },
    { id: 10, name: 'Prof. Ramírez', department: 'Química', tardiness: 20, classes: 24, avgDelay: 14 }
  ];

  const data = teacherData || defaultData;

  // Procesar y ordenar los datos
  const topTardy = useMemo(() => {
    return data.map(teacher => ({
      ...teacher,
      tardinessRate: ((teacher.tardiness / teacher.classes) * 100).toFixed(1),
      shortName: teacher.name.length > 15 ? `${teacher.name.substring(0, 15)}...` : teacher.name,
      shortDept: teacher.department.length > 15 ? `${teacher.department.substring(0, 15)}...` : teacher.department
    }))
    .sort((a, b) => b.tardiness - a.tardiness)
    .slice(0, 5);
  }, [data]);

  return (
    <div className="bg-white p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-gray-100 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm sm:text-base">Top 5 Profesores con Más Tardanzas</span>
        </h2>
      </div>

      <div className="space-y-2">
        {topTardy.map((teacher, index) => (
          <div 
            key={teacher.id} 
            className="group flex items-stretch justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full font-bold ${
                index === 0 ? 'bg-red-100 text-red-600' :
                index === 1 ? 'bg-orange-100 text-orange-600' :
                index === 2 ? 'bg-yellow-100 text-yellow-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {index + 1}
              </span>
              
              <div className="min-w-0">
                <p className="font-medium text-gray-800 truncate" title={teacher.name}>
                  {teacher.shortName}
                </p>
                <p className="text-gray-500 truncate" title={teacher.department}>
                  {teacher.shortDept}
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-2 text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="font-semibold text-red-600 whitespace-nowrap">{teacher.tardiness} tardanzas</span>
              </div>
              <p className="text-gray-400 whitespace-nowrap">{teacher.avgDelay} min. prom.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTardyTeachers;