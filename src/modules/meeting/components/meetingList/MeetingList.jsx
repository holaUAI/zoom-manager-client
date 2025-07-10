import { useState, useMemo } from "react";
import { Video, Clock, User, Search, Loader2, Calendar, Users, Filter, ChevronDown } from "lucide-react";
import { ClassDetailsModal } from "../../../dashboard/components/todaysClasses/modalInfo";

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
      status: "started",
      scheduledTime: "09:00 a.m.",
      openedTime: "09:02 a.m.",
      startedTime: "09:05 a.m.",
      specialty: "Planificación estratégica",
      sede: "Oficina Central"
    },
    {
      uuid: "2", 
      topic: "Demo del Producto",
      host_email: "ventas@empresa.com",
      duration: 30,
      status: "waiting",
      scheduledTime: "11:00 a.m.",
      specialty: "Ventas",
      sede: "Virtual"
    },
    {
      uuid: "3",
      topic: "Revisión de Código",
      host_email: "dev@empresa.com", 
      duration: 60,
      status: "ended",
      scheduledTime: "02:00 p.m.",
      openedTime: "02:00 p.m.",
      startedTime: "02:03 p.m.",
      specialty: "Desarrollo",
      sede: "Remoto"
    },
    {
      uuid: "4",
      topic: "Standup Diario",
      host_email: "scrum@empresa.com",
      duration: 15,
      status: "started",
      scheduledTime: "10:00 a.m.",
      openedTime: "10:01 a.m.",
      startedTime: "10:02 a.m.",
      specialty: "Desarrollo Ágil",
      sede: "Remoto"
    },
    {
      uuid: "5",
      topic: "Reunión de Marketing",
      host_email: "marketing@empresa.com",
      duration: 60,
      status: "not_started",
      scheduledTime: "09:00 a.m.",
      specialty: "Marketing",
      sede: "Oficina Central"
    }
  ];
  
  return { data, isLoading, error: null };
};

// Componente de pantalla de carga
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
          <Loader2 className="absolute inset-0 w-16 h-16 text-white animate-spin p-4" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Cargando Reuniones
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Preparando tu dashboard de reuniones...
        </p>
      </div>
      
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
    const [selectedReunion, setSelectedReunion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtroActivo, setFiltroActivo] = useState("todas");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const reunionesFiltradas = useMemo(() => {
        if (!Array.isArray(data)) return [];
        
        let resultados = data.filter((r) =>
            r.topic?.toLowerCase().includes(busqueda.toLowerCase())
        );
        
        // Aplicar filtro de estado
        switch(filtroActivo) {
            case "en_curso":
                resultados = resultados.filter(r => r.status === "started");
                break;
            case "proximo":
                resultados = resultados.filter(r => r.status === "waiting");
                break;
            case "sin_iniciar":
                resultados = resultados.filter(r => r.status === "not_started");
                break;
            case "finalizado":
                resultados = resultados.filter(r => r.status === "ended");
                break;
            default:
                // "todas" - no filtrar por estado
                break;
        }
        
        return resultados;
    }, [data, busqueda, filtroActivo]);

    const handleReunionClick = (reunion) => {
        setSelectedReunion({
            ...reunion,
            status: reunion.status === "started" ? "En curso" : 
                   reunion.status === "waiting" ? "Programado" : 
                   reunion.status === "not_started" ? "Sin iniciar" : "Finalizado",
            hostEmail: reunion.host_email,
            joinUrl: `https://zoom.us/j/${reunion.uuid}`,
            professor: reunion.host_email.split('@')[0]
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReunion(null);
    };

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
    const activas = data.filter((r) => r.status === "started").length;
    const proximas = data.filter((r) => r.status === "waiting").length;
    const sinIniciar = data.filter((r) => r.status === "not_started").length;
    const finalizadas = data.filter((r) => r.status === "ended").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Modal de detalles */}
            <ClassDetailsModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                selectedClass={selectedReunion} 
            />
            
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
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-white/80 p-4 shadow-lg rounded-xl border border-purple-100 backdrop-blur-sm">
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
                    
                    <div className="bg-white/80 p-4 shadow-lg rounded-xl border border-green-100 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500">En Curso</p>
                                <p className="text-2xl font-bold text-green-600">{activas}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 p-4 shadow-lg rounded-xl border border-yellow-100 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500">Próximas</p>
                                <p className="text-2xl font-bold text-yellow-600">{proximas}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 p-4 shadow-lg rounded-xl border border-red-100 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500">Sin Iniciar</p>
                                <p className="text-2xl font-bold text-red-600">{sinIniciar}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra de búsqueda compacta con botón de filtros */}
                <div className="max-w-2xl mx-auto flex gap-2 relative">
                    <div className="relative flex-1">
                        <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar reunión..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm bg-white/80 backdrop-blur-sm"
                        />
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => setMostrarFiltros(!mostrarFiltros)}
                            className="flex items-center justify-center px-4 py-2 rounded-xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-purple-600 hover:border-purple-300"
                        >
                            <Filter className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Filtros</span>
                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {mostrarFiltros && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setFiltroActivo("todas");
                                            setMostrarFiltros(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${filtroActivo === "todas" ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Todas las reuniones
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFiltroActivo("en_curso");
                                            setMostrarFiltros(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${filtroActivo === "en_curso" ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        En curso
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFiltroActivo("proximo");
                                            setMostrarFiltros(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${filtroActivo === "proximo" ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Próximas
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFiltroActivo("sin_iniciar");
                                            setMostrarFiltros(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${filtroActivo === "sin_iniciar" ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Sin iniciar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFiltroActivo("finalizado");
                                            setMostrarFiltros(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${filtroActivo === "finalizado" ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        Finalizadas
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Indicador de filtro activo */}
                {filtroActivo !== "todas" && (
                    <div className="max-w-2xl mx-auto flex justify-start">
                        <div className="inline-flex items-center bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-purple-700 border border-purple-200 shadow-sm">
                            <span className="mr-2">
                                {filtroActivo === "en_curso" && "Filtrado: En curso"}
                                {filtroActivo === "proximo" && "Filtrado: Próximas"}
                                {filtroActivo === "sin_iniciar" && "Filtrado: Sin iniciar"}
                                {filtroActivo === "finalizado" && "Filtrado: Finalizadas"}
                            </span>
                            <button 
                                onClick={() => setFiltroActivo("todas")}
                                className="text-purple-500 hover:text-purple-700"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Lista de Reuniones con scroll */}
                <div className="h-[calc(100vh-340px)] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                        {reunionesFiltradas.map((reunion, i) => (
                            <div
                                key={`${reunion.uuid}-${i}`}
                                className="bg-white/80 p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-gray-100 backdrop-blur-sm cursor-pointer
                                           transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl active:scale-95"
                                onClick={() => handleReunionClick(reunion)}
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
                                                    : reunion.status === "not_started"
                                                    ? "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md"
                                                    : "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md"
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                reunion.status === "started" ? "bg-green-200 animate-pulse" :
                                                reunion.status === "waiting" ? "bg-yellow-200 animate-pulse" :
                                                reunion.status === "not_started" ? "bg-red-200 animate-pulse" :
                                                "bg-gray-200"
                                            }`}></span>
                                            {reunion.status === "started" ? "En curso" : 
                                             reunion.status === "waiting" ? "Próximo" : 
                                             reunion.status === "not_started" ? "Sin iniciar" : "Finalizada"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mensaje cuando no hay resultados */}
                {reunionesFiltradas.length === 0 && (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-1">
                            {busqueda 
                                ? "No se encontraron reuniones con ese criterio" 
                                : "No hay reuniones que coincidan con el filtro"}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {busqueda 
                                ? "Intenta con otro término de búsqueda" 
                                : "Prueba con otro filtro o verifica más tarde"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}