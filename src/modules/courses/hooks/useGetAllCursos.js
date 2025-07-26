import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/cursos";

export const useCursos = () => {
    return useQuery({
        queryKey: ["cursos_sigu"],
        queryFn: getAll,
        select: (res) => res || [],
    });
};
