import React, { useState, useMemo } from 'react';
import { Search, User, GraduationCap, Filter, ChevronRight } from 'lucide-react';
import { useDocentes } from "../hooks/useGetAllDocentes";

export default function TeacherPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  // Usar hook
  const { data: professorsData = [], isLoading, isError } = useDocentes();

  // Mapear condiciones a texto legible
  const condicionMap = {
    "C": "Contratado",
    "N": "Nombrado"
  };

  // Mapear estados a texto legible
  const estadoMap = {
    1: "Activo",
    0: "Inactivo"
  };

  const filteredProfessors = useMemo(() => {
    return professorsData
      .filter((professor) => {
        const fullName = `${professor.c_apepat} ${professor.c_apemat} ${professor.c_nombres}`.toLowerCase();
        const matchesSearch =
          fullName.includes(searchTerm.toLowerCase()) ||
          professor.c_dni.includes(searchTerm.toLowerCase()) ||
          professor.cargo.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
          filterBy === "all" ||
          (filterBy === "activo" && professor.n_estado === 1) ||
          (filterBy === "inactivo" && professor.n_estado === 0) ||
          (filterBy === "contratado" && professor.condicion === "C") ||
          (filterBy === "nombrado" && professor.condicion === "N");

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.c_apepat.localeCompare(b.c_apepat);
          case "dni":
            return a.c_dni.localeCompare(b.c_dni);
          case "estado":
            return b.n_estado - a.n_estado;
          case "condicion":
            return a.condicion.localeCompare(b.condicion);
          default:
            return 0;
        }
      });
  }, [professorsData, searchTerm, sortBy, filterBy]);

  // Métricas calculadas
  const totalProfessors = professorsData.length;
  const activeProfessors = professorsData.filter(p => p.n_estado === 1).length;
  const contractedProfessors = professorsData.filter(p => p.condicion === "C").length;

  if (isLoading) {
    return <p className="text-center text-purple-600 mt-10">Cargando profesores...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600 mt-10">Error al cargar profesores.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Gestión de Profesores
          </h1>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow-lg rounded-xl border border-purple-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Total Profesores</p>
                <p className="text-2xl font-bold text-purple-600">{totalProfessors}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 shadow-lg rounded-xl border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Profesores Activos</p>
                <p className="text-2xl font-bold text-green-600">{activeProfessors}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 shadow-lg rounded-xl border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Contratados</p>
                <p className="text-2xl font-bold text-blue-600">{contractedProfessors}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="relative">
            <Search className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, DNI o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="name">Ordenar por Apellido</option>
                <option value="dni">Ordenar por DNI</option>
                <option value="estado">Ordenar por Estado</option>
                <option value="condicion">Ordenar por Condición</option>
              </select>
              <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 rotate-90" size={14} />
            </div>
            
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all">Todos los Filtros</option>
                <option value="activo">Estado: Activo</option>
                <option value="inactivo">Estado: Inactivo</option>
                <option value="contratado">Condición: Contratado</option>
                <option value="nombrado">Condición: Nombrado</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
        </div>

        {/* Lista de Profesores */}
        <div className="h-[calc(100vh-380px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredProfessors.map((professor, index) => (
              <div
                key={index}
                className="bg-white p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-gray-100"
              >
                <div className="space-y-3">
                  {/* Cabecera del profesor */}
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-gray-800 mb-1">
                        {professor.c_apepat} {professor.c_apemat}
                      </h3>
                      <p className="text-sm text-gray-600">{professor.c_nombres}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          professor.n_estado === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {estadoMap[professor.n_estado]}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          professor.condicion === "C" 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {condicionMap[professor.condicion]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Información detallada */}
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">DNI</p>
                          <p className="text-sm font-semibold">{professor.c_dni}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Cargo</p>
                          <p className="text-sm font-semibold">{professor.cargo}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-blue-700">Información completa</p>
                        <ChevronRight className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredProfessors.length === 0 && (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-1">No se encontraron profesores</h3>
            <p className="text-sm text-gray-500">
              {searchTerm ? 'Intenta con un término de búsqueda diferente' : 'Ajusta los filtros para ver más resultados'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
