import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Users, 
  Star, 
  Clock, 
  Search, 
  Mail, 
  Phone 
} from 'lucide-react'

// Componentes UI simulados (puedes reemplazarlos por los tuyos)
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
)

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
)

const Input = ({ placeholder, value, onChange, className = "" }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
)

const Badge = ({ children, variant = "default", className = "" }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
    variant === "outline" 
      ? "border border-gray-200 text-gray-700 bg-gray-50" 
      : "bg-blue-100 text-blue-800"
  } ${className}`}>
    {children}
  </span>
)

export default function TeacherPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [filterBy, setFilterBy] = useState("all")

  const professorsData = [
    // DOCTORADO EN SALUD PÚBLICA - SEDE PRINCIPAL
    {
      id: 1,
      name: "TOVAR BRANDAN JAVIER RUBÉN",
      email: "javier.tovar@uai.edu.pe",
      phone: "+51 (01) 123-4567",
      rating: 4.9,
      ratingVotes: 60,
      totalStudents: 60,
      courses: ["Bases Conceptuales de las Políticas Públicas", "Gestión y Desarrollo en Salud"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 98,
      punctualityTrend: "Excelente",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "MARCOS ROMERO JUANA MARÍA",
      email: "juana.marcos@uai.edu.pe",
      phone: "+51 (01) 234-5678",
      rating: 4.8,
      ratingVotes: 25,
      totalStudents: 25,
      courses: ["Historia y Epistemología de la Salud Pública"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 95,
      punctualityTrend: "Muy Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "JARAMILLO VALVERDE LUIS JOSE",
      email: "luis.jaramillo@uai.edu.pe",
      phone: "+51 (01) 345-6789",
      rating: 4.7,
      ratingVotes: 30,
      totalStudents: 30,
      courses: ["Investigación en Salud Pública"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 92,
      punctualityTrend: "Muy Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "PAREJA PERA TERESA LUISA",
      email: "teresa.pareja@uai.edu.pe",
      phone: "+51 (01) 456-7890",
      rating: 4.6,
      ratingVotes: 27,
      totalStudents: 27,
      courses: ["Realidad Nacional en Salud Publica","Seminario de Tesis II"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 88,
      punctualityTrend: "Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "CÁRDENAS DE FERNÁNDEZ MARÍA HILDA",
      email: "maria.cardenas@uai.edu.pe",
      phone: "+51 (01) 567-8901",
      rating: 4.5,
      ratingVotes: 22,
      totalStudents: 22,
      courses: ["Proyecto de Tesis"],
      specialty: "Doctorado en Salud Pública",
      sede: "PRINCIPAL",
      status: "Activo",
      punctuality: 90,
      punctualityTrend: "Muy Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    // DOCTORADO EN ADMINISTRACIÓN - SEDE FILIAL
    {
      id: 6,
      name: "GUANILO PAREDES CARLOS ENRIQUE",
      email: "carlos.guanilo@uai.edu.pe",
      phone: "+51 (01) 678-9012",
      rating: 4.7,
      ratingVotes: 24,
      totalStudents: 24,
      courses: ["Filosofía de la Investigación Científica"],
      specialty: "Doctorado en Administración",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 96,
      punctualityTrend: "Excelente",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      name: "ARBULÚ BALLESTEROS MARCO AGUSTÍN",
      email: "marco.arbulu@uai.edu.pe",
      phone: "+51 (01) 789-0123",
      rating: 4.5,
      ratingVotes: 71,
      totalStudents: 71,
      courses: ["Estadística", "Normas APA", "Redacción de un Artículo de Investigación"],
      specialty: "Doctorado en Administración",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 91,
      punctualityTrend: "Muy Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      name: "CALDERON PANIAGUA DENNYS GEOVANNI",
      email: "dennys.calderon@uai.edu.pe",
      phone: "+51 (01) 890-1234",
      rating: 4.4,
      ratingVotes: 29,
      totalStudents: 29,
      courses: ["Métodos Cuantitativos para la Investigación"],
      specialty: "Doctorado en Administración",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 89,
      punctualityTrend: "Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 9,
      name: "URIBE HERNANDEZ YRENE CECILIA",
      email: "yrene.uribe@uai.edu.pe",
      phone: "+51 (01) 901-2345",
      rating: 4.6,
      ratingVotes: 28,
      totalStudents: 28,
      courses: ["Seminario de Administración: Gestión Financiera"],
      specialty: "Doctorado en Administración",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 93,
      punctualityTrend: "Muy Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 10,
      name: "FERNÁNDEZ BEDOYA VÍCTOR HUGO",
      email: "victor.fernandez@uai.edu.pe",
      phone: "+51 (01) 012-3456",
      rating: 4.5,
      ratingVotes: 45,
      totalStudents: 45,
      courses: ["Seminario de Tesis I", "Seminario de Tesis III"],
      specialty: "Doctorado en Administración",
      sede: "FILIAL",
      status: "Activo",
      punctuality: 94,
      punctualityTrend: "Muy Bueno",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      "id": 11,
      "name": "PÉREZ DELGADO ORLANDO",
      "email": "orlando.perez@uai.edu.pe",
      "phone": "+51 (01) 456-7890",
      "rating": 4.7,
      "ratingVotes": 38,
      "totalStudents": 40,
      "courses": ["Normas Vancouver", "Redacción de un Artículo de Investigación"],
      "specialty": "Doctorado en Salud Pública",
      "sede": "FILIAL",
      "status": "Activo",
      "punctuality": 96,
      "punctualityTrend": "Muy Bueno",
      "avatar": "/placeholder.svg?height=80&width=80",
    },
    {
      "id": 12,
      "name": "OBANDO ZEGARRA ROXANA",
      "email": "roxana.obando@uai.edu.pe",
      "phone": "+51 (01) 321-6540",
      "rating": 4.6,
      "ratingVotes": 42,
      "totalStudents": 45,
      "courses": ["Determinantes Sociales"],
      "specialty": "Doctorado en Salud Pública",
      "sede": "FILIAL",
      "status": "Activo",
      "punctuality": 95,
      "punctualityTrend": "Muy Bueno",
      "avatar": "/placeholder.svg?height=80&width=80",
    },
    {
      "id": 13,
      "name": "CAYCHO VALENCIA FÉLIX ALBERTO",
      "email": "felix.caycho@uai.edu.pe",
      "phone": "+51 (01) 876-5432",
      "rating": 4.8,
      "ratingVotes": 44,
      "totalStudents": 44,
      "courses": ["Seminario de Tesis I", "Seminario de Tesis III"],
      "specialty": "Doctorado en Salud Pública",
      "sede": "FILIAL",
      "status": "Activo",
      "punctuality": 97,
      "punctualityTrend": "Muy Bueno",
      "avatar": "/placeholder.svg?height=80&width=80",
    },
    {
      "id": 14,
      "name": "MANRIQUE CARBAJAL OSKAR PAVEL",
      "email": "oskar.manrique@uai.edu.pe",
      "phone": "+51 (01) 234-5678",
      "rating": 4.5,
      "ratingVotes": 40,
      "totalStudents": 40,
      "courses": ["Gestión Económica en Salud"],
      "specialty": "Doctorado en Salud Pública",
      "sede": "FILIAL",
      "status": "Activo",
      "punctuality": 94,
      "punctualityTrend": "Muy Bueno",
      "avatar": "/placeholder.svg?height=80&width=80",
    },
    {
      "id": 15,
      "name": "MARCOS ROMERO JUANA MARÍA",
      "email": "juana.marcos@uai.edu.pe",
      "phone": "+51 (01) 987-6543",
      "rating": 4.6,
      "ratingVotes": 43,
      "totalStudents": 45,
      "courses": ["Salud Ambiental y Desarrollo Sostenible"],
      "specialty": "Doctorado en Salud Pública",
      "sede": "FILIAL",
      "status": "Activo",
      "punctuality": 95,
      "punctualityTrend": "Muy Bueno",
      "avatar": "/placeholder.svg?height=80&width=80",
    }
  ]

  const filteredProfessors = professorsData
    .filter((professor) => {
      const matchesSearch =
        professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professor.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())) ||
        professor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "salud" && professor.specialty.includes("Salud Pública")) ||
        (filterBy === "administracion" && professor.specialty.includes("Administración")) ||
        (filterBy === "principal" && professor.sede === "PRINCIPAL") ||
        (filterBy === "filial" && professor.sede === "FILIAL")
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        case "students":
          return b.totalStudents - a.totalStudents
        case "punctuality":
          return b.punctuality - a.punctuality
        default:
          return 0
      }
    })

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigate("dashboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profesores</h1>
              <p className="text-gray-600">Gestión completa del cuerpo docente</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="flex gap-2">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProfessors.map((professor) => (
              <Card key={professor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      {professor.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{professor.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{professor.specialty}</p>
                          <p className="text-xs text-gray-500">Sede: {professor.sede}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="truncate">{professor.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{professor.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{professor.totalStudents} estudiantes</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Cursos:</p>
                        <div className="flex flex-wrap gap-1">
                          {professor.courses.map((course, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium">Puntualidad: {professor.punctuality}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">
                                {professor.rating} ({professor.ratingVotes})
                              </span>
                            </div>
                          </div>
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
                                ? "bg-green-500 text-white"
                                : professor.punctuality >= 90
                                  ? "bg-blue-500 text-white"
                                  : "bg-yellow-500 text-white"
                            }
                          >
                            {professor.punctualityTrend}
                          </Badge>
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
  )
}