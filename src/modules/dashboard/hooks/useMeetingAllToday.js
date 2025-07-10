import { useQuery } from "@tanstack/react-query";
import { getAllGroupedToday } from "../api/dashboard";

export const useGroupedTodayMeetings = () => {
    return useQuery({
        queryKey: ["grouped-today-meetings"],
        queryFn: getAllGroupedToday,
        select: (res) => res?.data || {
            pending: [],
            started: [],
            finished: [],
            not_open: [],
        },
    });
};
