import { BookOpen, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const mockCourses = [
    { id: 1, nombre: "Gestión y Desarrollo en Salud", rating: 4.5, votos: 32 },
    { id: 2, nombre: "Investigación en Salud Pública", rating: 4.6, votos: 30 },
    { id: 3, nombre: "Métodos Cuantitativos para la Investigación", rating: 4.4, votos: 29 },
    { id: 4, nombre: "Seminario de Administración: Gestión Financiera", rating: 4.3, votos: 28 },
];

export default function TopCourses() {
    return (
        <div className="bg-white p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    Top de Cursos
                </h2>
                <Link 
                    to={"/cursos"} 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                >
                    Ver más <ChevronRight size={16} />
                </Link>
            </div>

            <ul className="space-y-3">
                {mockCourses.map((curso) => (
                    <li 
                        key={curso.id} 
                        className="group flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{curso.nombre}</p>
                            <p className="text-xs text-gray-500 mt-1">{curso.votos} votos</p>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-semibold text-yellow-600">{curso.rating}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}