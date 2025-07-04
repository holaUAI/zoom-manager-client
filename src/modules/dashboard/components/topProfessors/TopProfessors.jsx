import { useHosts } from "../../hooks/useHosts";

export default function TopProfessors() {
    const { data, isLoading } = useHosts();

    if (isLoading) return <div className="bg-white p-4 rounded-xl shadow">Cargando...</div>;
    if (!Array.isArray(data)) return <div>Error al cargar profesores</div>;

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-md">Top Profesores</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline">Ver más</a>
            </div>

            <ul className="space-y-3">
                {data.slice(0, 5).map((prof, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{index + 1}. {prof.user_name}</p>
                            <p className="text-sm text-gray-500">{prof.email}</p>
                        </div>
                        <div className="text-yellow-500 font-bold">★ 4.{9 - index}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
