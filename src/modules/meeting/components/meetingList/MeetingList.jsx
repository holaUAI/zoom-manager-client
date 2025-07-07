import { useState, useMemo } from "react";
import { useReuniones } from "../../hook/useMeetings";
import { Video, Clock, User, Search } from "lucide-react";

export default function ReunionesList() {
    // ✅ TODOS los hooks van al principio
    const { data, isLoading, error } = useReuniones();
    const [busqueda, setBusqueda] = useState("");

    const reunionesFiltradas = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((r) =>
            r.topic?.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [data, busqueda]);

    // ✅ Los returns condicionales van DESPUÉS de todos los hooks
    if (isLoading) return <p>Cargando reuniones...</p>;
    if (error || !Array.isArray(data)) return <p>Error al cargar reuniones</p>;

    // Métricas
    const total = data.length;
    const promedioDuracion = Math.round(
        data.reduce((sum, r) => sum + (r.duration || 0), 0) / (data.length || 1)
    );
    const activas = data.filter((r) => r.status === "started").length;

    return (
        <div className="space-y-6">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 shadow rounded-lg">
                    <p className="text-sm text-gray-500">Total Reuniones</p>
                    <p className="text-2xl font-bold">{total}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <p className="text-sm text-gray-500">Duración Promedio</p>
                    <p className="text-2xl font-bold">{promedioDuracion} min</p>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <p className="text-sm text-gray-500">Reuniones Activas</p>
                    <p className="text-2xl font-bold text-green-600">{activas}</p>
                </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Buscar por tema de reunión..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Lista de Reuniones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reunionesFiltradas.map((reunion, i) => (
                    <div
                        key={`${reunion.uuid}-${i}`}
                        className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
                    >
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Video size={16} /> {reunion.topic}
                        </h3>

                        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <User size={14} /> {reunion.host_email}
                        </div>

                        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <Clock size={14} /> Duración: {reunion.duration} min
                        </div>

                        <span
                            className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mt-2
                                ${reunion.status === "started"
                                    ? "bg-green-100 text-green-700"
                                    : reunion.status === "waiting"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {reunion.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}