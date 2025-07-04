import { BookOpen } from "lucide-react";

const mockCourses = [
    { id: 1, nombre: "Gestión y Desarrollo en Salud", rating: 4.5, votos: 32 },
    { id: 2, nombre: "Investigación en Salud Pública", rating: 4.6, votos: 30 },
    { id: 3, nombre: "Métodos Cuantitativos para la Investigación", rating: 4.4, votos: 29 },
    { id: 4, nombre: "Seminario de Administración: Gestión Financiera", rating: 4.3, votos: 28 },
];

export default function TopCourses() {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                    <BookOpen size={18} /> Top de Cursos
                </h2>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                    Ver más
                </a>
            </div>

            <ul className="space-y-3 text-sm">
                {mockCourses.map((curso, index) => (
                    <li key={curso.id} className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">{curso.nombre}</p>
                            <p className="text-gray-500 text-xs">{curso.votos} votos</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">{curso.rating}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
