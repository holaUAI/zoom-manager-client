// src/modules/clasesSigu/hooks/useGetAllDocentes.js
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/docente";

export const useDocentes = () => {
    return useQuery({
        queryKey: ["docentes_sigu"],
        queryFn: getAll,
        select: (res) => res || [], // Si la respuesta es null o undefined, devuelve array vacío
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
    });
};
