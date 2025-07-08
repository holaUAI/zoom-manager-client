import React, { useMemo } from 'react';

const TopTardyTeachers = ({ teacherData = null }) => {
  // Datos de ejemplo si no se proporcionan datos externos
  const defaultData = [
    { id: 1, name: 'Prof. García', department: 'Matemáticas', tardiness: 15, classes: 20, avgDelay: 12 },
    { id: 2, name: 'Prof. López', department: 'Historia', tardiness: 8, classes: 18, avgDelay: 8 },
    { id: 3, name: 'Prof. Martínez', department: 'Ciencias', tardiness: 22, classes: 25, avgDelay: 15 },
    { id: 4, name: 'Prof. Rodríguez', department: 'Literatura', tardiness: 5, classes: 16, avgDelay: 6 },
    { id: 5, name: 'Prof. Hernández', department: 'Inglés', tardiness: 18, classes: 22, avgDelay: 10 },
    { id: 6, name: 'Prof. Morales', department: 'Educación Física', tardiness: 12, classes: 20, avgDelay: 9 },
    { id: 7, name: 'Prof. Vargas', department: 'Arte', tardiness: 3, classes: 14, avgDelay: 5 },
    { id: 8, name: 'Rengifo hermenegildo jose', department: 'Gestion y desarrollo humano', tardiness: 25, classes: 28, avgDelay: 18 },
    { id: 9, name: 'Prof. Castro', department: 'Matemáticas', tardiness: 11, classes: 19, avgDelay: 7 },
    { id: 10, name: 'Prof. Ramírez', department: 'Química', tardiness: 20, classes: 24, avgDelay: 14 }
  ];

  const data = teacherData || defaultData;

  // Procesar y ordenar los datos
  const topTardy = useMemo(() => {
    return data.map(teacher => ({
      ...teacher,
      tardinessRate: ((teacher.tardiness / teacher.classes) * 100).toFixed(1)
    }))
    .sort((a, b) => b.tardiness - a.tardiness)
    .slice(0, 5);
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Top 5 Profesores con Más Tardanzas</h3>
      <div className="space-y-3">
        {topTardy.map((teacher, index) => (
          <div key={teacher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                index === 0 ? 'bg-red-100 text-red-600' :
                index === 1 ? 'bg-orange-100 text-orange-600' :
                index === 2 ? 'bg-yellow-100 text-yellow-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-gray-800">{teacher.name}</p>
                <p className="text-sm text-gray-600">{teacher.department}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-600">{teacher.tardiness} tardanzas</p>
              <p className="text-sm text-gray-600">{teacher.tardinessRate}% de sus clases</p>
              <p className="text-xs text-gray-500">{teacher.avgDelay} min promedio</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporta SOLO el componente principal como default
export default TopTardyTeachers;