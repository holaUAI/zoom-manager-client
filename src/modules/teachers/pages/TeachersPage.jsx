import React, { useState } from 'react';

// Componentes UI simulados
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

const Button = ({ children, variant = "default", size = "md", onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === "outline" 
        ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" 
        : "bg-blue-600 text-white hover:bg-blue-700"
    } ${className}`}
  >
    {children}
  </button>
);

const Input = ({ placeholder, value, onChange, className = "" }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Badge = ({ children, variant = "default", className = "" }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
    variant === "outline" 
      ? "border border-gray-200 text-gray-700 bg-gray-50" 
      : "bg-blue-100 text-blue-800"
  } ${className}`}>
    {children}
  </span>
);

export default function TeacherPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterBy, setFilterBy] = useState("all");

  const professorsData = [
    {
      id: 1,
      name: "TOVAR BRANDAN JAVIER RUBÉN",
      email: "javier.tovar@uai.edu.pe",
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
      name: "GARCÍA LÓPEZ MARÍA ISABEL",
      email: "maria.garcia@uai.edu.pe",
      phone: "+51 (01) 987-6543",
      rating: 4.7,
      ratingVotes: 45,
      totalStudents: 45,
      courses: ["Administración Estratégica", "Gestión de Proyectos", "Liderazgo Organizacional"],
      specialty: "Doctorado en Administración",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 95,
      punctualityTrend: "Excelente",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "MARTÍNEZ RUIZ CARLOS ALBERTO",
      email: "carlos.martinez@uai.edu.pe",
      phone: "+51 (01) 456-7890",
      rating: 4.5,
      ratingVotes: 35,
      totalStudents: 35,
      courses: ["Economía de la Salud", "Políticas Públicas en Salud", "Bioestadística Aplicada"],
      specialty: "Doctorado en Salud Pública",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 90,
      punctualityTrend: "Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    }
  ];

  const filteredProfessors = professorsData
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

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Profesores</h1>
              <p className="text-sm sm:text-base text-gray-600">Administra y revisa la información del cuerpo docente</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-t-4 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Profesores</p>
                  <p className="text-2xl font-bold">{professorsData.length}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rating Promedio</p>
                  <p className="text-2xl font-bold">4.6</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Puntualidad Promedio</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cursos Activos</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <Input
                    placeholder="Buscar por nombre, especialidad o curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white appearance-none"
                  >
                    <option value="rating">Ordenar por Rating</option>
                    <option value="name">Ordenar por Nombre</option>
                    <option value="students">Ordenar por Estudiantes</option>
                    <option value="punctuality">Ordenar por Puntualidad</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white appearance-none"
                  >
                    <option value="all">Todos los Filtros</option>
                    <option value="salud">Doctorado en Salud Pública</option>
                    <option value="administracion">Doctorado en Administración</option>
                    <option value="principal">Sede Principal</option>
                    <option value="filial">Sede Filial</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professors Grid - Scrollable Container */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          {filteredProfessors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessors.map((professor) => (
                <Card key={professor.id} className="hover:shadow-lg transition-shadow border border-gray-100">
                  <CardContent className="p-5">
                    {/* Cabecera alineada a la izquierda */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{professor.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{professor.specialty}</p>
                      <p className="text-xs text-gray-500">Sede: {professor.sede}</p>
                    </div>
                    
                    {/* Información de contacto */}
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>{professor.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>{professor.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>{professor.totalStudents} estudiantes</span>
                      </div>
                    </div>
                    
                    {/* Cursos */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Cursos:</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {professor.courses.map((course, index) => (
                          <li key={index} className="flex">
                            <span className="mr-2">•</span>
                            <span className="truncate" title={course}>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Sección de Puntualidad y Rating */}
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-sm font-medium">Puntualidad: {professor.punctuality}%</span>
                        </div>
                        <Badge
                          className={
                            professor.punctuality >= 95
                              ? "bg-green-500 text-white"
                              : professor.punctuality >= 90
                                ? "bg-blue-500 text-white"
                                : "bg-yellow-500 text-white"
                          }
                        >
                          {professor.punctualityTrend}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium">Valoración: {professor.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">({professor.ratingVotes} votos)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron profesores</h3>
              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}