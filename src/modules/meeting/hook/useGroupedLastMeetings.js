import { useQuery } from "@tanstack/react-query";
import { getLastMeetings } from "../api/meeting";

export const useGroupedLastMeetings = (limit) => {
    return useQuery({
        queryKey: ["grouped-last-meetings", limit],
        queryFn: () => getLastMeetings(limit),
        select: (res) => res?.data ?? {}, // solo retornamos el objeto `data` del response
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
