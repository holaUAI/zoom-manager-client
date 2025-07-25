import { Clock } from "lucide-react";
import { useTopDelayedHosts } from "../../hooks/useTopDelayedHosts";

export default function TopTardyTeachers() {
  const { data, isLoading } = useTopDelayedHosts();

  if (isLoading) {
    return (
      <div className="bg-white p-4 border rounded-xl shadow-md border-gray-100 animate-pulse w-full max-w-md mx-auto">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="bg-white p-4 border rounded-xl shadow-md border-gray-100 text-red-500 w-full max-w-md mx-auto">
        Error al cargar profesores con tardanza
      </div>
    );
  }

  const topTardy = data
    .map((host) => ({
      name: host.user_name || "Desconocido",
      email: host.email || "Sin correo",
      tardiness: host.amount_delay || 0,
      avgDelay: host.amount_delay_min || 0,
    }))
    .sort((a, b) => b.tardiness - a.tardiness)
    .slice(0, 5);

  return (
    <div className="bg-white p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-gray-100 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm sm:text-base">Profesores con Más Tardanzas</span>
        </h2>
      </div>

      <div className="space-y-2">
        {topTardy.map((teacher, index) => (
          <div
            key={index}
            className="group flex items-stretch justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full font-bold ${index === 0
                    ? "bg-red-100 text-red-600"
                    : index === 1
                      ? "bg-orange-100 text-orange-600"
                      : index === 2
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
              >
                {index + 1}
              </span>

              <div className="min-w-0">
                <p className="font-medium text-gray-800 truncate" title={teacher.name}>
                  {teacher.name}
                </p>
                <p className="text-gray-500 truncate" title={teacher.email}>
                  {teacher.email}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 ml-2 text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="font-semibold text-red-600 whitespace-nowrap">
                  {teacher.tardiness} tardanzas
                </span>
              </div>
              <p className="text-gray-400 whitespace-nowrap">{teacher.avgDelay} min. prom.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
