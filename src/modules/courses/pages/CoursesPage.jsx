import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Users,
  Star,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  TrendingUp,
  Award,
  ChevronRight,
  GraduationCap,
  Building
} from 'lucide-react';

export default function CoursesPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('students');
  const [filterBy, setFilterBy] = useState('all');

  const coursesData = [
    // DOCTORADO EN SALUD PÚBLICA - SEDE PRINCIPAL
    {
      id: 1,
      name: "Bases Conceptuales de las Políticas Públicas",
      specialty: "Doctorado en Salud Pública",
      students: 28,
      classes: 8,
      teacher: "TOVAR BRANDAN JAVIER RUBÉN",
      rating: 4.9,
      ratingVotes: 28,
      department: "Salud Pública",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 19:20-21:50",
      dateRange: "Inicio: 2025-05-03 Fin: 2025-05-24",
      timeRange: "Desde: 19:20 Hasta: 21:50",
      sede: "PRINCIPAL",
      day: "Sábado",
      completedClasses: 3,
      classRatings: [
        { score: 4.8, votes: 10 },
        { score: 4.9, votes: 12 },
        { score: 5.0, votes: 6 }
      ]
    },
    {
      id: 2,
      name: "Gestión y Desarrollo en Salud",
      specialty: "Doctorado en Salud Pública",
      students: 32,
      classes: 5,
      teacher: "TOVAR BRANDAN JAVIER RUBÉN",
      rating: 4.8,
      ratingVotes: 32,
      department: "Salud Pública",
      level: "Doctorado",
      duration: "2 semanas",
      schedule: "Sáb 19:20-21:50",
      dateRange: "Inicio: 2025-04-15 Fin: 2025-04-29",
      timeRange: "Desde: 19:20 Hasta: 21:50",
      sede: "PRINCIPAL",
      day: "Sábado",
      completedClasses: 0,
      classRatings: []
    },
    {
      id: 3,
      name: "Historia y Epistemología de la Salud Pública",
      specialty: "Doctorado en Salud Pública",
      students: 25,
      classes: 5,
      teacher: "MARCOS ROMERO JUANA MARÍA",
      rating: 4.7,
      ratingVotes: 25,
      department: "Salud Pública",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 19:20-22:40",
      dateRange: "Inicio: 2025-05-03 Fin: 2025-05-24",
      timeRange: "Desde: 19:20 Hasta: 22:40",
      sede: "PRINCIPAL",
      day: "Sábado",
      completedClasses: 1,
      classRatings: [
        { score: 4.7, votes: 10 }
      ]
    },
    {
      id: 4,
      name: "Proyecto de Tesis",
      specialty: "Doctorado en Salud Pública",
      students: 22,
      classes: 1,
      teacher: "CÁRDENAS DE FERNÁNDEZ MARÍA HILDA",
      rating: 4.4,
      ratingVotes: 22,
      department: "Salud Pública",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 18:30-20:35",
      dateRange: "Inicio: 2025-05-03 Fin: 2025-05-24",
      timeRange: "Desde: 18:30 Hasta: 20:35",
      sede: "PRINCIPAL",
      day: "Sábado",
      completedClasses: 1,
      classRatings: [
        { score: 4.4, votes: 22 }
      ]
    },

    // 👇 CASO 5: Curso con 1 clase pero NO FINALIZADO
    {
      id: 5,
      name: "Normas APA",
      specialty: "Doctorado en Administración",
      students: 23,
      classes: 1,
      teacher: "ARBULÚ BALLESTEROS MARCO AGUSTÍN",
      rating: 4.5, // Usamos este mientras no haya classRatings
      ratingVotes: 23,
      department: "Administración",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 19:20-21:00",
      dateRange: "Inicio: 2025-05-03 Fin: 2025-05-24",
      timeRange: "Desde: 19:20 Hasta: 21:00",
      sede: "FILIAL",
      day: "Sábado",
      completedClasses: 0,
      classRatings: []
    },

    // 👇 CASO 6: Curso con 2/10 clases completadas
    {
      id: 6,
      name: "Estadística",
      specialty: "Doctorado en Administración",
      students: 26,
      classes: 10,
      teacher: "ARBULÚ BALLESTEROS MARCO AGUSTÍN",
      rating: 4.5,
      ratingVotes: 26,
      department: "Administración",
      level: "Doctorado",
      duration: "7 semanas",
      schedule: "Sáb 19:20-22:40",
      dateRange: "Inicio: 2025-06-28 Fin: 2025-08-16",
      timeRange: "Desde: 19:20 Hasta: 21:25",
      sede: "FILIAL",
      day: "Sábado",
      completedClasses: 2,
      classRatings: [
        { score: 4.4, votes: 12 },
        { score: 4.6, votes: 14 }
      ]
    },

    // 👇 CASO 7: Curso sin ratings aún (solo tiene datos del curso)
    {
      id: 7,
      name: "Seminario de Investigación Científica",
      specialty: "Doctorado en Administración",
      students: 20,
      classes: 8,
      teacher: "FERNÁNDEZ BEDOYA VÍCTOR HUGO",
      rating: 4.5,
      ratingVotes: 20,
      department: "Administración",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 19:20-21:00",
      dateRange: "Inicio: 2025-05-03 Fin: 2025-05-24",
      timeRange: "Desde: 19:20 Hasta: 21:00",
      sede: "FILIAL",
      day: "Sábado",
      completedClasses: 0,
      classRatings: []
    },

    // 👇 CASO 8: Curso con todas las clases terminadas
    {
      id: 8,
      name: "Seminario de Tesis III",
      specialty: "Doctorado en Administración",
      students: 20,
      classes: 8,
      teacher: "FERNÁNDEZ BEDOYA VÍCTOR HUGO",
      rating: 4.5,
      ratingVotes: 20,
      department: "Administración",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 19:20-21:00",
      dateRange: "Inicio: 2025-05-03 Fin: 2025-05-24",
      timeRange: "Desde: 19:20 Hasta: 21:00",
      sede: "FILIAL",
      day: "Sábado",
      completedClasses: 8,
      classRatings: [
        { score: 4.4, votes: 10 },
        { score: 4.6, votes: 12 },
        { score: 4.5, votes: 11 },
        { score: 4.7, votes: 13 },
        { score: 4.5, votes: 10 },
        { score: 4.6, votes: 12 },
        { score: 4.7, votes: 11 },
        { score: 4.6, votes: 10 }
      ]
    },

    // 👇 CASO 9: Curso con 4/6 clases completadas
    {
      id: 9,
      name: "Estadística",
      specialty: "Doctorado en Administración",
      students: 26,
      classes: 6,
      teacher: "ARBULÚ BALLESTEROS MARCO AGUSTÍN",
      rating: 4.5,
      ratingVotes: 26,
      department: "Administración",
      level: "Doctorado",
      duration: "3 semanas",
      schedule: "Sáb 19:20-22:40",
      dateRange: "Inicio: 2025-05-31 Fin: 2025-06-21",
      timeRange: "Desde: 19:20 Hasta: 22:40",
      sede: "FILIAL",
      day: "Sábado",
      completedClasses: 4,
      classRatings: [
        { score: 4.3, votes: 10 },
        { score: 4.5, votes: 12 },
        { score: 4.7, votes: 11 },
        { score: 4.5, votes: 10 }
      ]
    },
  {
    "id": 10,
    "name": "Normas APA",
    "specialty": "Doctorado en Administración",
    "students": 22,
    "classes": 8,
    "teacher": "ARBULÚ BALLESTEROS MARCO AGUSTÍN",
    "rating": 4.3,
    "ratingVotes": 22,
    "department": "Administración",
    "level": "Doctorado",
    "duration": "3 semanas",
    "schedule": "Sáb 19:20-21:00",
    "dateRange": "Inicio: 2025-05-03 Fin: 2025-05-24",
    "timeRange": "Desde: 19:20 Hasta: 21:00",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 2,
      classRatings: [
        { score: 4.0, votes: 12 },
        { score: 4.1, votes: 14 }
      ]
  },
  {
    "id": 11,
    "name": "Seminario de Administración: Gestión Financiera",
    "specialty": "Doctorado en Administración",
    "students": 28,
    "classes": 12,
    "teacher": "URIBE HERNANDEZ YRENE CECILIA",
    "rating": 4.6,
    "ratingVotes": 28,
    "department": "Administración",
    "level": "Doctorado",
    "duration": "3 semanas",
    "schedule": "Sáb y Dom 19:20-22:40",
    "dateRange": "Inicio: 2025-05-31 Fin: 2025-06-21",
    "timeRange": "Desde: 19:20 Hasta: 22:40",
    "sede": "FILIAL",
    "day": "Sábado y Domingo",
      completedClasses: 2,
      classRatings: [
        { score: 4.0, votes: 12 },
        { score: 4.5, votes: 14 }
      ]
  },
  {
    "id": 12,
    "name": "Seminario de Tesis I",
    "specialty": "Doctorado en Administración",
    "students": 25,
    "classes": 10,
    "teacher": "FERNÁNDEZ BEDOYA VÍCTOR HUGO",
    "rating": 4.5,
    "ratingVotes": 25,
    "department": "Administración",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Sáb 19:20-21:25",
    "dateRange": "Inicio: 2025-06-28 Fin: 2025-08-16",
    "timeRange": "Desde: 19:20 Hasta: 21:25",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 2,
      classRatings: [
        { score: 4.0, votes: 12 },
        { score: 4.0, votes: 14 }
      ]
  },
  {
    "id": 13,
    "name": "Redacción de un Artículo de Investigación",
    "specialty": "Doctorado en Administración",
    "students": 23,
    "classes": 10,
    "teacher": "ARBULÚ BALLESTEROS MARCO AGUSTÍN",
    "rating": 4.4,
    "ratingVotes": 23,
    "department": "Administración",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Sáb 19:20-21:25",
    "dateRange": "Inicio: 2025-06-28 Fin: 2025-08-16",
    "timeRange": "Desde: 19:20 Hasta: 21:25",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 2,
      classRatings: [
        { score: 4.4, votes: 12 },
        { score: 4.6, votes: 14 }
      ]
  },
  {
    "id": 14,
    "name": "Seminario de Tesis III",
    "specialty": "Doctorado en Administración",
    "students": 20,
    "classes": 8,
    "teacher": "FERNÁNDEZ BEDOYA VÍCTOR HUGO",
    "rating": 4.5,
    "ratingVotes": 20,
    "department": "Administración",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Dom 17:40-20:10",
    "dateRange": "Inicio: 2025-05-04 Fin: 2025-06-22",
    "timeRange": "Desde: 17:40 Hasta: 20:10",
    "sede": "FILIAL",
    "day": "Domingo",
      completedClasses: 2,
      classRatings: [
        { score: 4.4, votes: 12 },
        { score: 4.6, votes: 14 }
      ]
  },
  {
    "id": 15,
    "name": "Normas Vancouver",
    "specialty": "Doctorado en Salud Pública",
    "students": 20,
    "classes": 8,
    "teacher": "PÉREZ DELGADO ORLANDO",
    "rating": 4.3,
    "ratingVotes": 20,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "3 semanas",
    "schedule": "Sáb 19:20-21:00",
    "dateRange": "Inicio: 2025-05-10 Fin: 2025-05-24",
    "timeRange": "Desde: 19:20 Hasta: 21:00",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 2,
      classRatings: [
        { score: 4.4, votes: 12 },
        { score: 4.6, votes: 14 }
      ]
  },
  {
    "id": 16,
    "name": "Determinantes Sociales",
    "specialty": "Doctorado en Salud Pública",
    "students": 22,
    "classes": 8,
    "teacher": "OBANDO ZEGARRA ROXANA",
    "rating": 4.4,
    "ratingVotes": 22,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "3 semanas",
    "schedule": "Sáb 19:20-22:40",
    "dateRange": "Inicio: 2025-05-31 Fin: 2025-06-21",
    "timeRange": "Desde: 19:20 Hasta: 22:40",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 2,
      classRatings: [
        { score: 4.4, votes: 12 },
        { score: 4.6, votes: 14 }
      ]
  },
  {
    "id": 17,
    "name": "Seminario de Tesis I",
    "specialty": "Doctorado en Salud Pública",
    "students": 24,
    "classes": 12,
    "teacher": "CAYCHO VALENCIA FÉLIX ALBERTO",
    "rating": 4.5,
    "ratingVotes": 24,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Sáb 19:20-21:25",
    "dateRange": "Inicio: 2025-06-28 Fin: 2025-08-16",
    "timeRange": "Desde: 19:20 Hasta: 21:25",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 0,
      classRatings: []
  },
  {
    "id": 18,
    "name": "Gestión Económica en Salud",
    "specialty": "Doctorado en Salud Pública",
    "students": 23,
    "classes": 8,
    "teacher": "MANRIQUE CARBAJAL OSKAR PAVEL",
    "rating": 4.4,
    "ratingVotes": 23,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "3 semanas",
    "schedule": "Sáb 19:20-21:00",
    "dateRange": "Inicio: 2025-05-10 Fin: 2025-05-24",
    "timeRange": "Desde: 19:20 Hasta: 21:00",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 0,
      classRatings: []
  },
  {
    "id": 19,
    "name": "Salud Ambiental y Desarrollo Sostenible",
    "specialty": "Doctorado en Salud Pública",
    "students": 25,
    "classes": 8,
    "teacher": "MARCOS ROMERO JUANA MARÍA",
    "rating": 4.5,
    "ratingVotes": 25,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "3 semanas",
    "schedule": "Sáb 19:20-22:40",
    "dateRange": "Inicio: 2025-05-31 Fin: 2025-06-21",
    "timeRange": "Desde: 19:20 Hasta: 22:40",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 0,
      classRatings: []
  },
  {
    "id": 20,
    "name": "Seminario de Tesis II",
    "specialty": "Doctorado en Salud Pública",
    "students": 22,
    "classes": 12,
    "teacher": "PAREJA PERA TERESA LUISA",
    "rating": 4.5,
    "ratingVotes": 22,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Sáb 19:20-21:50",
    "dateRange": "Inicio: 2025-06-28 Fin: 2025-08-16",
    "timeRange": "Desde: 19:20 Hasta: 21:50",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 0,
      classRatings: []
  },
  {
    "id": 21,
    "name": "Redacción de un Artículo de Investigación",
    "specialty": "Doctorado en Salud Pública",
    "students": 23,
    "classes": 10,
    "teacher": "PÉREZ DELGADO ORLANDO",
    "rating": 4.4,
    "ratingVotes": 23,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Sáb 19:20-21:25",
    "dateRange": "Inicio: 2025-06-28 Fin: 2025-08-16",
    "timeRange": "Desde: 19:20 Hasta: 21:25",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 0,
      classRatings: []
  },
  {
    "id": 22,
    "name": "Seminario de Tesis III",
    "specialty": "Doctorado en Salud Pública",
    "students": 21,
    "classes": 10,
    "teacher": "CAYCHO VALENCIA FÉLIX ALBERTO",
    "rating": 4.5,
    "ratingVotes": 21,
    "department": "Salud Pública",
    "level": "Doctorado",
    "duration": "7 semanas",
    "schedule": "Sáb 19:20-21:50",
    "dateRange": "Inicio: 2025-05-10 Fin: 2025-06-21",
    "timeRange": "Desde: 19:20 Hasta: 21:50",
    "sede": "FILIAL",
    "day": "Sábado",
      completedClasses: 0,
      classRatings: []
  }
  ];

  const calculateAverageRating = (ratings) => {
    if (!ratings.length) return null;
    const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
    const avg = totalScore / ratings.length;
    const totalVotes = ratings.reduce((sum, r) => sum + r.votes, 0);
    return {
      average: avg.toFixed(1),
      votes: totalVotes
    };
  };

  const filteredCourses = coursesData
    .filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterBy === 'all' ||
        (filterBy === 'salud' && course.specialty.includes('Salud Pública')) ||
        (filterBy === 'administracion' && course.specialty.includes('Administración')) ||
        (filterBy === 'principal' && course.sede === 'PRINCIPAL') ||
        (filterBy === 'filial' && course.sede === 'FILIAL') ||
        (filterBy === 'doctorado' && course.level.includes('Doctorado'));
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'students':
          return b.students - a.students;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'classes':
          return b.classes - a.classes;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Cursos Académicos
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">Gestión completa de programas educativos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-white/80" />
              <div className="text-right">
                <p className="text-xs text-blue-100">Sistema Académico</p>
                <p className="text-xs text-blue-200">Universidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[{
            title: "Total Cursos", value: coursesData.length, icon: <BookOpen className="h-6 w-6 text-white" />,
            color: "from-blue-500 to-blue-600", trend: "+12% mes", up: true
          }, {
            title: "Estudiantes", value: "1,451", icon: <Users className="h-6 w-6 text-white" />,
            color: "from-green-500 to-emerald-600", trend: "+12% mes", up: true
          }, {
            title: "Rating Promedio", value: "4.6", icon: <Award className="h-6 w-6 text-white" />,
            color: "from-yellow-500 to-orange-500"
          }, {
            title: "Clases Totales", value: "128", icon: <Clock className="h-6 w-6 text-white" />,
            color: "from-purple-500 to-purple-600", trend: "Este semestre"
          }].map((card, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  {card.trend && (
                    <p className={`text-xs mt-1 flex items-center ${card.up ? 'text-green-600' : 'text-purple-600'}`}>
                      {card.up && <TrendingUp className="h-3 w-3 mr-1" />}
                      {card.trend}
                    </p>
                  )}
                </div>
                <div className={`bg-gradient-to-br ${card.color} p-2 rounded-lg`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                placeholder="Buscar cursos, especialidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative w-full sm:w-auto flex-1 min-w-[150px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
                >
                  <option value="students">📊 Por Estudiantes</option>
                  <option value="name">📝 Por Nombre</option>
                  <option value="rating">⭐ Por Rating</option>
                  <option value="classes">🎓 Por Clases</option>
                </select>
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white min-w-[180px]"
              >
                <option value="all">🎯 Todos los Cursos</option>
                <option value="salud">🏥 Salud Pública</option>
                <option value="administracion">💼 Administración</option>
                <option value="principal">🏛️ Sede Principal</option>
                <option value="filial">🏢 Sede Filial</option>
                <option value="doctorado">🎓 Solo Doctorado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCourses.map((course, index) => {
              const avgRating = calculateAverageRating(course.classRatings || []);
              const progress = course.classes > 0 ? (course.completedClasses / course.classes) * 100 : 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="p-4 space-y-3">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-t-xl"></div>
                      <div className="flex flex-col sm:flex-row sm:items-start pt-2 gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                            {course.name}
                          </h3>
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium inline-block mt-1">
                            {course.specialty}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                            <div className="flex items-center">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {course.level}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {course.sede}
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          {avgRating ? (
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              <span className="font-bold">{avgRating.average}</span>
                            </div>
                          ) : course.rating ? (
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              <span className="font-bold">{course.rating}</span>
                            </div>
                          ) : (
                            <div className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                              Sin calificar
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Schedule Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800 text-sm">Horario</span>
                      </div>
                      <div className="text-xs">
                        <div>Día: <span className="font-medium">{course.day}</span></div>
                        <div>Hora: <span className="font-medium">{course.timeRange}</span></div>
                        <div className="mt-1 text-gray-500">{course.dateRange}</div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2 rounded-lg border border-green-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-green-700">Estudiantes</p>
                            <p className="text-lg font-bold text-green-800">{course.students}</p>
                          </div>
                          <Users className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-2 rounded-lg border border-purple-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-purple-700">Progreso</p>
                            <p className="text-lg font-bold text-purple-800">
                              {course.completedClasses ?? 0}/{course.classes}
                            </p>
                          </div>
                          <BookOpen className="h-6 w-6 text-purple-500" />
                        </div>
                      </div>
                    </div>

                    {/* Teacher Info */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-1.5 rounded">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800">Docente</p>
                          <p className="text-xs text-gray-600 truncate">{course.teacher}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* No Results Found */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron cursos</h3>
            <p className="text-gray-500 text-sm mb-4">Intenta ajustar los filtros de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
                setSortBy('students');
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