import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Star,
  Clock,
  Search,
  Mail,
  Phone
} from 'lucide-react';

// Componentes UI simulados (puedes reemplazarlos por los tuyos)
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
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigate("dashboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al Dashboard</span>
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profesores</h1>
              <p className="text-sm sm:text-base text-gray-600">Gestión completa del cuerpo docente</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Profesores</p>
                  <p className="text-2xl font-bold">{professorsData.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rating Promedio</p>
                  <p className="text-2xl font-bold">4.6</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Puntualidad Promedio</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, especialidad o curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="rating">Ordenar por Rating</option>
                  <option value="name">Ordenar por Nombre</option>
                  <option value="students">Ordenar por Estudiantes</option>
                  <option value="punctuality">Ordenar por Puntualidad</option>
                </select>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todos los Filtros</option>
                  <option value="salud">Doctorado en Salud Pública</option>
                  <option value="administracion">Doctorado en Administración</option>
                  <option value="principal">Sede Principal</option>
                  <option value="filial">Sede Filial</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professors Grid - Scrollable Container */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessors.map((professor) => (
              <Card key={professor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icono de usuario en lugar de iniciales */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{professor.name}</h3>
                          <p className="text-sm text-blue-600 font-medium truncate">{professor.specialty}</p>
                          <p className="text-xs text-gray-500">Sede: {professor.sede}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{professor.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{professor.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{professor.totalStudents} estudiantes</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Cursos:</p>
                        <div className="flex flex-wrap gap-1 overflow-hidden">
                          {professor.courses.map((course, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs max-w-full truncate"
                              title={course}
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-lg p-2 gap-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              <span className="text-sm font-medium whitespace-nowrap">Puntualidad: {professor.punctuality}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current flex-shrink-0" />
                              <span className="text-sm font-medium whitespace-nowrap">
                                {professor.rating} ({professor.ratingVotes})
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Badge
                              variant={
                                professor.punctuality >= 95
                                  ? "default"
                                  : professor.punctuality >= 90
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                professor.punctuality >= 95
                                  ? "bg-green-500 text-white whitespace-nowrap"
                                  : professor.punctuality >= 90
                                    ? "bg-blue-500 text-white whitespace-nowrap"
                                    : "bg-yellow-500 text-white whitespace-nowrap"
                              }
                            >
                              {professor.punctualityTrend}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredProfessors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron profesores</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}