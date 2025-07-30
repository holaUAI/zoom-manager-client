import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiClock,
  FiX,
  FiVideo,
  FiRefreshCw
} from "react-icons/fi";
import { useClasesSigu } from "../hooks/useGetAllClasesSigu";

// Función para formatear fecha desde el formato ISO
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);

  return {
    date: dateObj.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: dateObj.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    dateObj,
  };
};

export const ClasesSigu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Consumimos el hook con paginación
  const { data, isLoading, isError, refetch } = useClasesSigu(page, limit);
  const reuniones = data?.data || [];
  const totalPages = data?.pages || 1;

  // Cargar opciones de programa y filtrar clases
  useEffect(() => {
    if (!reuniones || reuniones.length === 0) return;

    const programs = [...new Set(reuniones.map((clase) => clase.c_codesp))];
    setProgramOptions(programs);

    filterClasses();
  }, [reuniones]);

  // Filtrar clases
  const filterClasses = () => {
    if (!reuniones) return;

    const result = reuniones.filter((clase) => {
      const matchesSearch =
        clase.temaReunion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clase.c_codcur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clase.c_codesp.toLowerCase().includes(searchTerm.toLowerCase());
    
      const matchesDate = filterDate
        ? new Date(clase.fechaInicioReunion).toISOString().slice(0, 10) === filterDate
        : true;
    
      const matchesProgram = filterProgram
        ? clase.c_codesp === filterProgram
        : true;
    
      return matchesSearch && matchesDate && matchesProgram;
    });

    // Ordenar por fecha más próxima
    result.sort((a, b) => {
      const dateA = new Date(a.fechaInicioReunion);
      const dateB = new Date(b.fechaInicioReunion);
      return dateA - dateB;
    });

    setFilteredClasses(result);
  };

  // Refiltrar cada vez que cambien filtros
  useEffect(() => {
    filterClasses();
  }, [searchTerm, filterDate, filterProgram]);

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm("");
    setFilterDate("");
    setFilterProgram("");
  };

  // Pantalla de carga mejorada
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] flex flex-col items-center justify-center p-4">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <FiVideo className="text-indigo-600 text-4xl animate-ping" />
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Preparando tus clases
          </h2>
          <p className="text-gray-600 max-w-md">
            Estamos organizando todas las clases programadas para ti...
          </p>
          
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de error mejorada
  if (isError) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] flex flex-col items-center justify-center p-4">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center animate-ping">
              <div className="w-6 h-6 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-lg">
          <h3 className="text-2xl font-bold text-red-600 mb-3">
            ¡Ups! Algo salió mal
          </h3>
          <p className="text-gray-700 text-lg mb-6">
            Estamos teniendo problemas con el servidor. Por favor inténtalo nuevamente.
          </p>
          
          <button
            onClick={refetch}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium flex items-center space-x-2 mx-auto"
          >
            <FiRefreshCw className="animate-spin" />
            <span>Reintentar ahora</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6246EA] to-[#9333EA] mb-2">
            Clases Programadas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto hidden md:block">
            Consulta tus próximas clases virtuales, organizadas por programa académico y fecha
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-200 flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 text-lg" />
            </div>
            <input
              type="text"
              placeholder="Buscar por tema, curso o programa..."
              className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
          >
            <FiFilter className="text-lg" />
            <span>Filtrar</span>
          </button>
        </div>

        {/* Filtros adicionales */}
        {showFilters && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Filtrar por fecha:
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Filtrar por programa:
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                >
                  <option value="">Todos los programas</option>
                  {programOptions.map((program, index) => (
                    <option key={index} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {(filterDate || filterProgram) && (
              <div className="mt-3 text-right">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-indigo-600 flex items-center gap-1 transition-colors duration-300"
                >
                  <FiX /> Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid */}
        {filteredClasses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClasses.map((clase, index) => {
                const { date, time } = formatDate(clase.fechaInicioReunion);
                const isToday = new Date(clase.fechaInicioReunion).toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 relative group"
                  >
                    {isToday && (
                      <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full z-10 animate-pulse">
                        HOY
                      </div>
                    )}
                    
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-[calc(100%-40px)]">
                          <span className="inline-block px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-2">
                            {clase.c_codesp}
                          </span>
                          <h2 className="text-lg md:text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition-colors">
                            {clase.temaReunion}
                          </h2>
                          <p className="text-xs text-gray-500 truncate">
                            {clase.c_codcur}
                          </p>
                        </div>
                        <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white flex items-center justify-center shadow-md">
                          <FiVideo className="text-sm" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-blue-600 mb-3">
                        <div className="bg-blue-100 p-1.5 rounded-full">
                          <FiCalendar className="text-blue-600 text-sm" />
                        </div>
                        <span className="text-sm">{date}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-blue-600 mb-4">
                        <div className="bg-blue-100 p-1.5 rounded-full">
                          <FiClock className="text-blue-600 text-sm" />
                        </div>
                        <span className="text-sm">{time}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Duración:</span>{" "}
                          {clase.duracion_minutos} minutos
                        </div>
                        <button className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-100 transition-colors">
                          Unirse
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
              <span className="text-gray-700 font-semibold">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                Siguiente
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron clases</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchTerm || filterDate || filterProgram 
                ? "No hay clases que coincidan con tus criterios de búsqueda" 
                : "Actualmente no hay clases programadas disponibles"}
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2 mx-auto"
            >
              <FiX /> Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};