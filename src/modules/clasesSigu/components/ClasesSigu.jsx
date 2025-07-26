import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiCalendar, FiExternalLink, FiClock, FiUser, FiBook, FiX, FiVideo } from 'react-icons/fi';

// Función para formatear fechas
const formatDate = (dateString) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');
  
  const dateObj = new Date(year, month - 1, day, hours, minutes);
  
  return {
    date: dateObj.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    time: dateObj.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    dateObj
  };
};

// Datos de prueba actualizados
const reuniones = [
  {
    "c_dni": "01569217",
    "c_apepat": "LÓPEZ",
    "c_apemat": "RUALES",
    "c_nombres": "ROSA DEL PILAR",
    "cargo": "DOCENTE",
    "nomesp": "DOCTORADO EN ADMINISTRACIÓN",
    "condicion": "C",
    "n_estado": 1,
    "horario_clases": "26/07/2025 11:00",
    "link_zoom": "https://us06web.zoom.us/j/89853548878?pwd=2tXxZFXVQ3lCYuo0Vi8ZLZr2SISbxR.1#success",
    "curso": "Gestión Estratégica Empresarial"
  },
  {
    "c_dni": "02568473",
    "c_apepat": "GARCÍA",
    "c_apemat": "MÉNDEZ",
    "c_nombres": "JUAN CARLOS",
    "cargo": "DOCENTE",
    "nomesp": "MAESTRÍA EN EDUCACIÓN",
    "condicion": "C",
    "n_estado": 1,
    "horario_clases": "27/07/2025 09:30",
    "link_zoom": "https://us06web.zoom.us/j/89853548878?pwd=2tXxZFXVQ3lCYuo0Vi8ZLZr2SISbxR.1#success",
    "curso": "Innovación Educativa"
  },
  {
    "c_dni": "03569874",
    "c_apepat": "MARTÍNEZ",
    "c_apemat": "SÁNCHEZ",
    "c_nombres": "MARÍA FERNANDA",
    "cargo": "DOCENTE",
    "nomesp": "DOCTORADO EN DERECHO",
    "condicion": "C",
    "n_estado": 1,
    "horario_clases": "28/07/2025 14:00",
    "link_zoom": "https://us06web.zoom.us/j/89853548878?pwd=2tXxZFXVQ3lCYuo0Vi8ZLZr2SISbxR.1#success",
    "curso": "Derecho Internacional"
  },
  {
    "c_dni": "04561234",
    "c_apepat": "RODRÍGUEZ",
    "c_apemat": "GÓMEZ",
    "c_nombres": "CARLOS ALBERTO",
    "cargo": "DOCENTE",
    "nomesp": "MAESTRÍA EN INGENIERÍA DE SISTEMAS",
    "condicion": "C",
    "n_estado": 1,
    "horario_clases": "29/07/2025 16:00",
    "link_zoom": "https://us06web.zoom.us/j/89853548878?pwd=2tXxZFXVQ3lCYuo0Vi8ZLZr2SISbxR.1#success",
    "curso": "Inteligencia Artificial"
  },
  {
    "c_dni": "05569876",
    "c_apepat": "PÉREZ",
    "c_apemat": "LÓPEZ",
    "c_nombres": "ANA MARÍA",
    "cargo": "DOCENTE",
    "nomesp": "DOCTORADO EN PSICOLOGÍA",
    "condicion": "C",
    "n_estado": 1,
    "horario_clases": "30/07/2025 10:00",
    "link_zoom": "https://us06web.zoom.us/j/89853548878?pwd=2tXxZFXVQ3lCYuo0Vi8ZLZr2SISbxR.1#success",
    "curso": "Psicología Organizacional"
  },
  {
    "c_dni": "06561234",
    "c_apepat": "SÁNCHEZ",
    "c_apemat": "MARTÍNEZ",
    "c_nombres": "LUIS FERNANDO",
    "cargo": "DOCENTE",
    "nomesp": "MAESTRÍA EN ECONOMÍA",
    "condicion": "C",
    "n_estado": 1,
    "horario_clases": "31/07/2025 15:30",
    "link_zoom": "https://us06web.zoom.us/j/89853548878?pwd=2tXxZFXVQ3lCYuo0Vi8ZLZr2SISbxR.1#success",
    "curso": "Economía Global"
  }
];

export const ClasesSigu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);

  // Preparar datos al cargar
  useEffect(() => {
    // Extraer programas únicos
    const programs = [...new Set(reuniones.map(clase => clase.nomesp))];
    setProgramOptions(programs);
    
    // Filtrar clases iniciales
    filterClasses();
  }, []);

  // Filtrar clases
  const filterClasses = () => {
    const result = reuniones.filter(clase => {
      const matchesSearch = clase.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           clase.c_nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           clase.nomesp.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = filterDate ? 
        clase.horario_clases.startsWith(filterDate) : true;
      
      const matchesProgram = filterProgram ? 
        clase.nomesp === filterProgram : true;
      
      return matchesSearch && matchesDate && matchesProgram;
    });
    
    // Ordenar por fecha más próxima
    result.sort((a, b) => {
      const dateA = formatDate(a.horario_clases).dateObj;
      const dateB = formatDate(b.horario_clases).dateObj;
      return dateA - dateB;
    });
    
    setFilteredClasses(result);
  };

  // Aplicar filtros
  useEffect(() => {
    filterClasses();
  }, [searchTerm, filterDate, filterProgram]);

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setFilterDate('');
    setFilterProgram('');
  };

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
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-5 mb-6 md:mb-8 border border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                placeholder="Buscar por curso, profesor o programa..."
                className="pl-10 md:pl-12 pr-4 py-2.5 md:py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 bg-gradient-to-r from-[#9333EA] to-[#7e22ce] text-white rounded-lg hover:from-[#7e22ce] hover:to-[#6b21a8] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FiFilter className="text-lg" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>
          
          {/* Filtros avanzados */}
          {showFilters && (
            <div className="mt-4 md:mt-5 p-4 md:p-5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-800">Filtros Avanzados</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FiX className="text-gray-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Filtrar por fecha:
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Filtrar por programa:
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                    value={filterProgram}
                    onChange={(e) => setFilterProgram(e.target.value)}
                  >
                    <option value="">Todos los programas</option>
                    {programOptions.map((program, index) => (
                      <option key={index} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {(filterDate || filterProgram) && (
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FiX className="text-sm" />
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Información de filtros */}
        {(filterDate || filterProgram || searchTerm) && (
          <div className="mb-5 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs md:text-sm">
                <FiSearch className="text-xs md:text-sm" /> Buscando: "{searchTerm}"
              </span>
            )}
            {filterDate && (
              <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs md:text-sm">
                <FiCalendar className="text-xs md:text-sm" /> Fecha: {new Date(filterDate).toLocaleDateString('es-ES')}
              </span>
            )}
            {filterProgram && (
              <span className="bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs md:text-sm">
                <FiBook className="text-xs md:text-sm" /> Programa: {filterProgram}
              </span>
            )}
          </div>
        )}
        
        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClasses.map((clase, index) => {
              const { date, time } = formatDate(clase.horario_clases);
              
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
                          {clase.nomesp}
                        </span>
                        <h2 className="text-lg md:text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-[#6246EA] transition-colors">
                          {clase.curso}
                        </h2>
                      </div>
                      <div className="p-1.5 bg-gradient-to-br from-[#6246EA] to-[#9333EA] rounded-full text-white flex items-center justify-center">
                        <FiVideo className="text-sm" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="bg-purple-100 p-1.5 rounded-full">
                        <FiUser className="text-[#9333EA] text-sm" />
                      </div>
                      <p className="text-gray-700 text-sm">
                        <span className="font-semibold">Profesor:</span> {clase.c_nombres} {clase.c_apepat}
                      </p>
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
                    
                    <a
                      href={clase.link_zoom}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-[#6246EA] to-[#9333EA] text-white rounded-lg hover:from-[#4f3ab7] hover:to-[#7e22ce] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <FiExternalLink className="text-sm" />
                      <span className="text-sm">Unirse a la clase</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="max-w-md mx-auto">
              <div className="w-14 h-14 bg-gradient-to-r from-[#6246EA] to-[#9333EA] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="text-white text-xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-2">No se encontraron clases programadas</h3>
              <p className="text-gray-600 mt-1.5 text-sm">
                No hay clases que coincidan con tu búsqueda. Intenta con otros filtros.
              </p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6246EA] to-[#9333EA] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 md:mt-10 text-center text-gray-500 text-xs md:text-sm max-w-7xl mx-auto">
        <p>Mostrando {filteredClasses.length} de {reuniones.length} clases disponibles</p>
      </div>
    </div>
  );
};