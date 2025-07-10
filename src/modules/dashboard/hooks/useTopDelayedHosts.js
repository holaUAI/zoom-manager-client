import { useQuery } from "@tanstack/react-query";
import { getTopDelayedHosts } from "../api/dashboard";

export const useTopDelayedHosts = () => {
    return useQuery({
        queryKey: ["top-delayed-hosts"],
        queryFn: getTopDelayedHosts,
        select: (res) => res?.data || [],
    });
};
