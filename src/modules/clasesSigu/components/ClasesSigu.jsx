import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiClock,
  FiX,
  FiVideo,
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
  const { data, isLoading, isError } = useClasesSigu(page, limit);
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

  if (isLoading) {
    return <p className="text-center text-indigo-600">Cargando clases...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">Error al cargar clases.</p>;
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
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200 flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 text-lg" />
            </div>
            <input
              type="text"
              placeholder="Buscar por tema, curso o programa..."
              className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiFilter className="text-lg" />
            <span>Filtrar</span>
          </button>
        </div>

        {/* Filtros adicionales */}
        {showFilters && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Filtrar por fecha:
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Filtrar por programa:
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                >
                  <option value="">Todos</option>
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
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
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

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-all duration-300 relative group"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6246EA] to-[#9333EA]"></div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-[calc(100%-40px)]">
                          <span className="inline-block px-2.5 py-1 text-xs font-semibold text-[#9333EA] bg-purple-100 rounded-full mb-2">
                            {clase.c_codesp}
                          </span>
                          <h2 className="text-lg md:text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-[#6246EA] transition-colors">
                            {clase.temaReunion}
                          </h2>
                        </div>
                        <div className="p-1.5 bg-gradient-to-br from-[#6246EA] to-[#9333EA] rounded-full text-white flex items-center justify-center">
                          <FiVideo className="text-sm" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-[#0EA5E9] mb-3">
                        <div className="bg-blue-100 p-1.5 rounded-full">
                          <FiCalendar className="text-[#0EA5E9] text-sm" />
                        </div>
                        <span className="text-sm">{date}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-[#0EA5E9] mb-4">
                        <div className="bg-blue-100 p-1.5 rounded-full">
                          <FiClock className="text-[#0EA5E9] text-sm" />
                        </div>
                        <span className="text-sm">{time}</span>
                      </div>

                      <div className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold">Duración:</span>{" "}
                        {clase.duracion_minutos} minutos
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-700 font-semibold">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-600">No se encontraron clases programadas</p>
          </div>
        )}
      </div>
    </div>
  );
};
