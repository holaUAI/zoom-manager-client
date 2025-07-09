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

// Componente de pantalla de carga (mejorado y centrado)
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center space-y-6">
      {/* Contenedor del loader centrado */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
          <Loader2 className="absolute inset-0 w-16 h-16 text-white animate-spin p-4" />
        </div>
      </div>
      
      {/* Texto */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Cargando Reuniones
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Preparando tu dashboard de reuniones...
        </p>
      </div>
      
      {/* Puntos animados */}
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-red-500 text-xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-bold text-red-600">Error al cargar</h2>
                    <p className="text-sm text-gray-600">Intenta nuevamente.</p>
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
            <div className="container mx-auto px-4 py-6 space-y-6">
                {/* Header compacto */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Lista de Reuniones
                    </h1>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        Gestiona y monitorea todas tus reuniones
                    </p>
                </div>

                {/* Estadísticas compactas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow-lg rounded-xl border border-purple-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500">Total Reuniones</p>
                                <p className="text-2xl font-bold text-purple-600">{total}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 shadow-lg rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500">Duración Promedio</p>
                                <p className="text-2xl font-bold text-blue-600">{promedioDuracion} min</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 shadow-lg rounded-xl border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500">Reuniones Activas</p>
                                <p className="text-2xl font-bold text-green-600">{activas}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra de búsqueda compacta */}
                <div className="max-w-xl mx-auto">
                    <div className="relative">
                        <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar reunión..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                        />
                    </div>
                </div>

                {/* Lista de Reuniones con scroll */}
                <div className="h-[calc(100vh-340px)] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                        {reunionesFiltradas.map((reunion, i) => (
                            <div
                                key={`${reunion.uuid}-${i}`}
                                className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-gray-100"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <h3 className="font-bold text-base text-gray-800 flex items-center gap-2 flex-1">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                                <Video className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="line-clamp-2">{reunion.topic}</span>
                                        </h3>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User size={14} />
                                            </div>
                                            <span className="text-xs font-medium">{reunion.host_email}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Clock size={14} />
                                            </div>
                                            <span className="text-xs font-medium">{reunion.duration} min</span>
                                        </div>
                                    </div>

                                    <div className="pt-1">
                                        <span
                                            className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full transition-all duration-200 
                                                ${reunion.status === "started"
                                                    ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
                                                    : reunion.status === "waiting"
                                                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md"
                                                    : "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md"
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
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
                </div>

                {/* Mensaje cuando no hay resultados */}
                {reunionesFiltradas.length === 0 && busqueda && (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-1">No se encontraron reuniones</h3>
                        <p className="text-sm text-gray-500">Intenta con otro término</p>
                    </div>
                )}
            </div>
        </div>
    );
}