import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/meeting";

export const useReuniones = () => {
    return useQuery({
        queryKey: ["reuniones"],
        queryFn: getAll,
        select: (res) => res?.data || [],
    });
};
