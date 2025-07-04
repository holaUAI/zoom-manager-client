import { useQuery } from "@tanstack/react-query";
import { getAllMeetings } from "../api/dashboard";

export const useMeetings = () => {
    return useQuery({
        queryKey: ["meetings"],
        queryFn: getAllMeetings,
        staleTime: 1000 * 60 * 5,
    });
};
