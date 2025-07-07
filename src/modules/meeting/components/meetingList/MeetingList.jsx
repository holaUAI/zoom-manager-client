import { useState, useMemo } from "react";
import { Video, Clock, User, Search, Loader2, Calendar, Users, TrendingUp } from "lucide-react";

// Simulando el hook useReuniones para la demo
const useReuniones = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simular carga
  setTimeout(() => setIsLoading(false), 2000);
  
  const data = [
    {
      uuid: "1",
      topic: "Reunión de Planificación Q1",
      host_email: "manager@empresa.com",
      duration: 45,
      status: "started"
    },
    {
      uuid: "2", 
      topic: "Demo del Producto",
      host_email: "ventas@empresa.com",
      duration: 30,
      status: "waiting"
    },
    {
      uuid: "3",
      topic: "Revisión de Código",
      host_email: "dev@empresa.com", 
      duration: 60,
      status: "ended"
    },
    {
      uuid: "4",
      topic: "Standup Diario",
      host_email: "scrum@empresa.com",
      duration: 15,
      status: "started"
    }
  ];
  
  return { data, isLoading, error: null };
};

// Componente de pantalla de carga
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center space-y-8">
      {/* Animación de carga principal */}
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
        <Loader2 className="absolute inset-0 w-24 h-24 text-white animate-spin p-6" />
      </div>
      
      {/* Texto de carga */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Cargando Reuniones
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Preparando tu dashboard de reuniones con la información más reciente...
        </p>
      </div>
      
      {/* Indicadores de progreso */}
      <div className="flex justify-center space-x-2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
);

export default function ReunionesList() {
    const { data, isLoading, error } = useReuniones();
    const [busqueda, setBusqueda] = useState("");

    const reunionesFiltradas = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((r) =>
            r.topic?.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [data, busqueda]);

    if (isLoading) return <LoadingScreen />;
    if (error || !Array.isArray(data)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-red-500 text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-red-600">Error al cargar reuniones</h2>
                    <p className="text-gray-600">No se pudieron cargar las reuniones. Intenta nuevamente.</p>
                </div>
            </div>
        );
    }

    // Métricas
    const total = data.length;
    const promedioDuracion = Math.round(
        data.reduce((sum, r) => sum + (r.duration || 0), 0) / (data.length || 1)
    );
    const activas = data.filter((r) => r.status === "started").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Lista de Reuniones
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Gestiona y monitorea todas tus reuniones desde un solo lugar
                    </p>
                </div>

                {/* Estadísticas mejoradas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 shadow-xl rounded-2xl border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Reuniones</p>
                                <p className="text-3xl font-bold text-purple-600">{total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 shadow-xl rounded-2xl border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Duración Promedio</p>
                                <p className="text-3xl font-bold text-blue-600">{promedioDuracion} min</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 shadow-xl rounded-2xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Reuniones Activas</p>
                                <p className="text-3xl font-bold text-green-600">{activas}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra de búsqueda mejorada */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute top-4 left-4 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por tema de reunión..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                        />
                    </div>
                </div>

                {/* Lista de Reuniones mejorada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reunionesFiltradas.map((reunion, i) => (
                        <div
                            key={`${reunion.uuid}-${i}`}
                            className="bg-white p-6 border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-gray-100"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                            <Video className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="line-clamp-2">{reunion.topic}</span>
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                        <span className="text-sm font-medium">{reunion.host_email}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Clock size={16} />
                                        </div>
                                        <span className="text-sm font-medium">{reunion.duration} minutos</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <span
                                        className={`inline-flex items-center text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 
                                            ${reunion.status === "started"
                                                ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg"
                                                : reunion.status === "waiting"
                                                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg"
                                                : "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg"
                                            }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            reunion.status === "started" ? "bg-green-200 animate-pulse" :
                                            reunion.status === "waiting" ? "bg-yellow-200 animate-pulse" :
                                            "bg-gray-200"
                                        }`}></span>
                                        {reunion.status === "started" ? "En vivo" : 
                                         reunion.status === "waiting" ? "Esperando" : "Finalizada"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje cuando no hay resultados */}
                {reunionesFiltradas.length === 0 && busqueda && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron reuniones</h3>
                        <p className="text-gray-500">Intenta con un término de búsqueda diferente</p>
                    </div>
                )}
            </div>
        </div>
    );
}