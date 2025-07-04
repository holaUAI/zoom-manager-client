import {
    Clock,
    Star,
    BookOpen,
    Users,
    Briefcase,
    GraduationCap,
} from "lucide-react";

const stats = [
    {
        title: "Promedio de Puntualidad del Docente",
        value: "94.8%",
        icon: <Clock />,
        bg: "bg-blue-600",
    },
    {
        title: "Puntuación Promedio de clases",
        value: "4.6",
        icon: <Star />,
        bg: "bg-violet-500",
    },
    {
        title: "Puntuación promedio de cursos",
        value: "4.5",
        icon: <BookOpen />,
        bg: "bg-green-600",
    },
    {
        title: "Puntuación promedio de profesores",
        value: "4.2",
        icon: <Star />,
        bg: "bg-sky-600",
    },
    {
        title: "Horas Impartidas",
        value: "2,150",
        icon: <Briefcase />,
        bg: "bg-orange-500",
    },
    {
        title: "Total de Alumnos",
        value: "1,451",
        icon: <GraduationCap />,
        bg: "bg-red-600",
    },
];

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl p-5 text-white shadow ${stat.bg}`}
                >
                    <div>
                        <p className="text-sm">{stat.title}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                    </div>
                    <div className="text-3xl opacity-80">{stat.icon}</div>
                </div>
            ))}
        </div>
    );
}
