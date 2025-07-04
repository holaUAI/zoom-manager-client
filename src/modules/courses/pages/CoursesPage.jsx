import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Users,
  Star,
  Calendar,
  MapPin,
  Clock,
  User,
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
          rating: 4.9, // Este valor será reemplazado por el promedio de classRatings
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

        // 👇 CASO 2: Curso con 0/5 clases completadas
        {
          id: 2,
          name: "Gestión y Desarrollo en Salud",
          specialty: "Doctorado en Salud Pública",
          students: 32,
          classes: 5,
          teacher: "TOVAR BRANDAN JAVIER RUBÉN",
          rating: 4.8, // Se usa porque aún no hay clases completadas
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

        // 👇 CASO 3: Curso con 1/5 clases completadas
        {
          id: 3,
          name: "Historia y Epistemología de la Salud Pública",
          specialty: "Doctorado en Salud Pública",
          students: 25,
          classes: 5,
          teacher: "MARCOS ROMERO JUANA MARÍA",
          rating: 4.7, // No se muestra si ya hay classRatings
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

        // 👇 CASO 4: Curso con 1 clase total y finalizada
        {
          id: 4,
          name: "Proyecto de Tesis",
          specialty: "Doctorado en Salud Pública",
          students: 22,
          classes: 1,
          teacher: "CÁRDENAS DE FERNÁNDEZ MARÍA HILDA",
          rating: 4.4, // Se mantiene igual al único rating
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
      },
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
    <div className="p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center space-x-2 border px-3 py-1 rounded hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al Dashboard</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
              <p className="text-gray-600">Gestión completa de cursos académicos</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border rounded-lg shadow-sm bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cursos</p>
                <p className="text-2xl font-bold">{coursesData.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="border rounded-lg shadow-sm bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estudiantes Totales</p>
                <p className="text-2xl font-bold">1451</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="border rounded-lg shadow-sm bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating Promedio</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="border rounded-lg shadow-sm bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clases Totales</p>
                <p className="text-2xl font-bold">128</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="border rounded-lg shadow-sm bg-white p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                placeholder="Buscar por nombre, especialidad o docente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 border rounded-md p-2"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="students">Ordenar por Estudiantes</option>
                <option value="name">Ordenar por Nombre</option>
                <option value="rating">Ordenar por Rating</option>
                <option value="classes">Ordenar por Clases</option>
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
                <option value="doctorado">Solo Doctorado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid - Scrollable Container */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const avgRating = calculateAverageRating(course.classRatings || []);
              return (
                <div key={course.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 bg-white">
                  <div className="space-y-4">
                    {/* Title and Specialty */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{course.specialty}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <span>{course.level}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>Sede {course.sede}</span>
                        </div>
                      </div>
                      {/* Rating */}
                      {avgRating ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="ml-1 font-medium">{avgRating.average}</span>
                          <span className="ml-1 text-xs text-gray-500">({avgRating.votes} votos)</span>
                        </div>
                      ) : course.classes === 1 && course.rating ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="ml-1 font-medium">{course.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({course.ratingVotes} votos)</span>
                        </div>
                      ) : (
                        <p className="italic text-sm text-gray-500">Sin puntaje aún</p>
                      )}
                    </div>
                    {/* Schedule Info */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Horario:</span>
                        </div>
                        <p><strong>Día:</strong> {course.day}</p>
                        <p><strong>Período:</strong> {course.dateRange}</p>
                        <p><strong>Hora:</strong> {course.timeRange}</p>
                      </div>
                    </div>
                    {/* Students & Classes */}
                    <div className="flex justify-between">
                      <div className="bg-green-100 p-3 rounded-lg text-center w-1/2 mr-2">
                        <p className="text-sm font-medium">Estudiantes</p>
                        <p className="text-lg font-bold">{course.students}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg text-center w-1/2 ml-2">
                        <p className="text-sm font-medium">Clases</p>
                        <p className="text-lg font-bold">
                          {course.completedClasses ?? 0}/{course.classes}
                        </p>
                      </div>
                    </div>
                    {/* Teacher */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Docente</p>
                          <p className="text-sm text-gray-600">{course.teacher}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* No results found */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}

      </div>
    </div>
  );
}