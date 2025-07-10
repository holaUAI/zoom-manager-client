import { useHosts } from "../../hooks/useHosts";
import { Link } from "react-router-dom";
import { User, ChevronRight, Star } from "lucide-react";

export default function TopProfessors() {
    const { data, isLoading } = useHosts();

    if (isLoading) return (
        <div className="bg-white p-4 border rounded-xl shadow-md border-gray-100 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
                ))}
            </div>
        </div>
    );

    if (!Array.isArray(data)) return (
        <div className="bg-white p-4 border rounded-xl shadow-md border-gray-100 text-red-500">
            Error al cargar profesores
        </div>
    );

    return (
        <div className="bg-white p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    Top Profesores
                </h2>
                <Link 
                    to={"/docentes"} 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                >
                    Ver más <ChevronRight size={16} />
                </Link>
            </div>

            <ul className="space-y-3">
                {data.slice(0, 5).map((prof, index) => (
                    <li 
                        key={index} 
                        className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-500 w-5">{index + 1}.</span>
                            <div>
                                <p className="font-medium text-gray-800">{prof.user_name}</p>
                                <p className="text-xs text-gray-500 mt-1">{prof.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-semibold text-yellow-600">4.{9 - index}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}