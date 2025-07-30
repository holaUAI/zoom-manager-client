import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  TrendingUp,
  GraduationCap,
  Building,
  Calendar,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useCursos } from '../hooks/useGetAllCursos';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Usar el hook
  const { data: coursesData = [], isLoading, isError } = useCursos();

  // Filtrar y ordenar cursos
  const filteredCourses = useMemo(() => {
    return coursesData
      .filter((course) => {
        const matchesSearch =
          course.c_nomcur.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.nomesp.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.c_codcur.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
          filterBy === 'all' ||
          (filterBy === 'administracion' &&
            course.nomesp.toLowerCase().includes('administración')) ||
          (filterBy === 'salud' &&
            course.nomesp.toLowerCase().includes('salud pública')) ||
          (filterBy === 'educacion' &&
            course.nomesp.toLowerCase().includes('educación'));

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.c_nomcur.localeCompare(b.c_nomcur);
          case 'code':
            return a.c_codcur.localeCompare(b.c_codcur);
          case 'specialty':
            return a.nomesp.localeCompare(b.nomesp);
          default:
            return 0;
        }
      });
  }, [coursesData, searchTerm, filterBy, sortBy]);

  // Pantalla de carga animada (igual al ejemplo de profesores)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center">
        <div className="animate-bounce mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Buscando cursos
          </h3>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>
          <p className="text-purple-700 mt-4 max-w-md">
            Estamos recopilando la información de todos los cursos. Por favor espere un momento...
          </p>
        </div>
      </div>
    );
  }

  // Pantalla de error mejorada (igual al ejemplo de profesores)
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="relative mb-6 animate-pulse">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-16 h-16 text-white" />
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
            Estamos teniendo problemas con el servidor. Por favor inténtalo nuevamente más tarde.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <div className="flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              <span>Reintentar ahora</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      {/* Header */}
      <div className="text-gray-900 mb-6">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cursos Académicos
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 backdrop-blur-sm transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cursos</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {coursesData.length}
                </p>
                <p className="text-xs mt-1 flex items-center text-purple-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Este semestre
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 rounded-xl shadow-md p-4 md:p-6 border border-gray-100 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                placeholder="Buscar cursos, especialidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 focus:bg-white/90 backdrop-blur-sm"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative w-full sm:w-auto flex-1 min-w-[150px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 focus:bg-white/90 backdrop-blur-sm"
                >
                  <option value="name">📝 Por Nombre</option>
                  <option value="code">🔠 Por Código</option>
                  <option value="specialty">🎓 Por Especialidad</option>
                </select>
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 focus:bg-white/90 backdrop-blur-sm min-w-[180px]"
              >
                <option value="all">🎯 Todos los Cursos</option>
                <option value="administracion">💼 Administración</option>
                <option value="salud">🏥 Salud Pública</option>
                <option value="educacion">📚 Educación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group backdrop-blur-sm"
              >
                <div className="p-4 space-y-3">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-t-xl"></div>
                    <div className="flex flex-col sm:flex-row sm:items-start pt-2 gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          {course.c_nomcur}
                        </h3>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium inline-block mt-1">
                          {course.nomesp}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            Doctorado
                          </div>
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {course.c_codesp}
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-medium">
                          {course.c_codcur}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-blue-800 text-sm">
                        Código del Curso
                      </span>
                    </div>
                    <div className="text-sm font-mono font-bold text-blue-900">
                      {course.c_codcur}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-1.5 rounded">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-800">
                          Especialidad
                        </p>
                        <p className="text-sm text-gray-700 truncate">
                          {course.nomesp}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results Found */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-10 bg-white/80 rounded-xl shadow-md border border-gray-100 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Intenta ajustar los filtros de búsqueda
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
                setSortBy('name');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}