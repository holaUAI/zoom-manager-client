import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, Users, BookOpen, Phone, Mail, MapPin, TrendingUp, User, GraduationCap, Filter } from 'lucide-react';

export default function TeacherPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterBy, setFilterBy] = useState("all");

  const professorsData = [
    {
      id: 1,
      name: "Dante Fabian Luque Zelada",
      email: "DanteLuque@uai.edu.pe",
      phone: "+51 (01) 123-4567",
      rating: 4.9,
      ratingVotes: 60,
      totalStudents: 60,
      courses: ["Bases Conceptuales de las Políticas Públicas", "Gestión y Desarrollo en Salud", "Salud Pública Avanzada", "Metodología de Investigación"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 98,
      punctualityTrend: "Excelente",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Pierina Alejandra Briceño Villa",
      email: "Pierina.Briceño@uai.edu.pe",
      phone: "+51 (01) 123-4568",
      rating: 4.7,
      ratingVotes: 45,
      totalStudents: 45,
      courses: ["Administración Estratégica", "Gestión de Recursos Humanos", "Liderazgo Organizacional"],
      specialty: "Doctorado en Administración",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 95,
      punctualityTrend: "Excelente",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Luis Miguel Felix Atuncar",
      email: "Luis.Felix@uai.edu.pe",
      phone: "+51 (01) 123-4569",
      rating: 4.5,
      ratingVotes: 38,
      totalStudents: 38,
      courses: ["Epidemiología", "Bioestadística", "Investigación en Salud"],
      specialty: "Doctorado en Salud Pública",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 82,
      punctualityTrend: "Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Sher Jhair Mendoza Quispe",
      email: "Sher.Mendoza@uai.edu.pe",
      phone: "+51 (01) 456-7890",
      rating: 4.6,
      ratingVotes: 27,
      totalStudents: 27,
      courses: ["Realidad Nacional en Salud Publica","Seminario de Tesis II"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 95,
      punctualityTrend: "Excelente",
      avatar: "/placeholder.svg?height=80&width=80",
    }
  ];

  const filteredProfessors = useMemo(() => {
    return professorsData
      .filter((professor) => {
        const matchesSearch =
          professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professor.courses.some((course) =>
            course.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          professor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
          filterBy === "all" ||
          (filterBy === "salud" && professor.specialty.includes("Salud Pública")) ||
          (filterBy === "administracion" && professor.specialty.includes("Administración")) ||
          (filterBy === "principal" && professor.sede === "PRINCIPAL") ||
          (filterBy === "filial" && professor.sede === "FILIAL");

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "name":
            return a.name.localeCompare(b.name);
          case "students":
            return b.totalStudents - a.totalStudents;
          case "punctuality":
            return b.punctuality - a.punctuality;
          default:
            return 0;
        }
      });
  }, [searchTerm, sortBy, filterBy]);

  // Métricas calculadas
  const totalProfessors = professorsData.length;
  const averageRating = (professorsData.reduce((sum, p) => sum + p.rating, 0) / totalProfessors).toFixed(1);
  const averagePunctuality = Math.round(professorsData.reduce((sum, p) => sum + p.punctuality, 0) / totalProfessors);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Gestión de Profesores
          </h1>
        </div>

        {/* Estadísticas mejoradas */}
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
          
          <div className="bg-white p-4 shadow-lg rounded-xl border border-yellow-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Rating Promedio</p>
                <p className="text-2xl font-bold text-yellow-600">{averageRating}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 shadow-lg rounded-xl border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Puntualidad Promedio</p>
                <p className="text-2xl font-bold text-green-600">{averagePunctuality}%</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtros mejorada */}
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="relative">
            <Search className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o curso..."
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
                <option value="rating">Ordenar por Rating</option>
                <option value="name">Ordenar por Nombre</option>
                <option value="students">Ordenar por Estudiantes</option>
                <option value="punctuality">Ordenar por Puntualidad</option>
              </select>
              <TrendingUp className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
            
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all">Todos los Filtros</option>
                <option value="salud">Doctorado en Salud Pública</option>
                <option value="administracion">Doctorado en Administración</option>
                <option value="principal">Sede Principal</option>
                <option value="filial">Sede Filial</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
        </div>

        {/* Lista de Profesores mejorada con scroll */}
        <div className="h-[calc(100vh-380px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredProfessors.map((professor) => (
              <div
                key={professor.id}
                className="bg-white p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-gray-100"
              >
                <div className="space-y-3">
                  {/* Cabecera del profesor */}
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-gray-800 mb-1 line-clamp-2">{professor.name}</h3>
                      <p className="text-xs text-blue-600 font-medium mb-1">{professor.specialty}</p>
                      <div className="flex items-center gap-2">
                        <MapPin size={10} className="text-gray-400" />
                        <span className="text-xs text-gray-500">Sede: {professor.sede}</span>
                      </div>
                    </div>
                  </div>

                  {/* Información de contacto */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Mail size={12} />
                      </div>
                      <span className="text-xs font-medium truncate">{professor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Phone size={12} />
                      </div>
                      <span className="text-xs font-medium">{professor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users size={12} />
                      </div>
                      <span className="text-xs font-medium">{professor.totalStudents} estudiantes</span>
                    </div>
                  </div>

                  {/* Cursos */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <BookOpen size={12} />
                      Cursos:
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {professor.courses.slice(0, 3).map((course, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-1 text-purple-500">•</span>
                          <span className="line-clamp-1" title={course}>{course}</span>
                        </li>
                      ))}
                      {professor.courses.length > 3 && (
                        <li className="text-purple-600 text-xs font-medium">
                          +{professor.courses.length - 3} más...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Métricas de desempeño */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-gray-500">({professor.ratingVotes})</span>
                      </div>
                      <p className="text-base font-bold text-yellow-600">{professor.rating}</p>
                      <p className="text-xs text-gray-600">Valoración</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <Clock className="w-3 h-3 text-green-500" />
                        <span className={`text-xs px-1 py-0.5 rounded-full ${
                          professor.punctuality >= 95 ? 'bg-green-100 text-green-800' :
                          professor.punctuality >= 90 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {professor.punctualityTrend}
                        </span>
                      </div>
                      <p className="text-base font-bold text-green-600">{professor.punctuality}%</p>
                      <p className="text-xs text-gray-600">Puntualidad</p>
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