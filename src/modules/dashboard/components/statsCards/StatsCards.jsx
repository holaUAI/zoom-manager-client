import {
    Clock,
    Star,
    BookOpen,
    Briefcase,
    GraduationCap,
    Users
} from "lucide-react";

const stats = [
    {
        title: "Promedio de Puntualidad del Docente",
        value: "94.8%",
        icon: Clock,
        bg: "bg-gradient-to-r from-green-500 to-green-600",
        iconBg: "bg-green-700",
    },
    {
        title: "Promedio de Asistentes por clases",
        value: "20",
        icon: Users,
        bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
        iconBg: "bg-yellow-700",
    },
    {
        title: "Puntuación promedio de cursos",
        value: "4.5",
        icon: BookOpen,
        bg: "bg-gradient-to-r from-purple-500 to-purple-600",
        iconBg: "bg-purple-700",
    },
    {
        title: "Puntuación promedio de profesores",
        value: "4.2",
        icon: Star,
        bg: "bg-gradient-to-r from-blue-500 to-blue-600",
        iconBg: "bg-blue-700",
    },
    {
        title: "Horas Impartidas",
        value: "2,150",
        icon: Briefcase,
        bg: "bg-gradient-to-r from-orange-500 to-orange-600",
        iconBg: "bg-orange-700",
    },
    {
        title: "Total de Alumnos",
        value: "1,451",
        icon: GraduationCap,
        bg: "bg-gradient-to-r from-indigo-500 to-indigo-600",
        iconBg: "bg-indigo-700",
    },
];

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={i}
                        className={`${stat.bg} p-4 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium opacity-90 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.iconBg} bg-opacity-30`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}