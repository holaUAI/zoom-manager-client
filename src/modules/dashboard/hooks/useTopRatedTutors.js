import { useQuery } from "@tanstack/react-query";
import { getTopTutorsRated } from "../api/dashboard";

export const useTopRatedTutors = () => {
    return useQuery({
        queryKey: ["topRatedTutors"],
        queryFn: getTopTutorsRated,
        select: (res) => res?.data || [],
    });
};