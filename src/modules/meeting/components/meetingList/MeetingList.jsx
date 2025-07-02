import { useReuniones } from "../../hook/useMeetings";

export default function ReunionesList() {
    const { data, isLoading, error } = useReuniones();

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar reuniones</p>;

    // Aquí validamos que sea array
    if (!Array.isArray(data)) {
        console.error("La data no es un array:", data);
        return <p>Datos inválidos</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((reunion) => (
                <div key={reunion.id} className="p-4 border rounded-md shadow">
                    <h3 className="font-semibold">{reunion.topic}</h3>
                    <p className="text-sm text-gray-500">
                        {new Date(reunion.start_time).toLocaleString("es-PE")}
                    </p>
                    <a
                        href={reunion.join_url}
                        target="_blank"
                        className="text-blue-600 underline text-sm"
                    >
                        Enlace de Zoom
                    </a>
                </div>
            ))}
        </div>
    );
}
