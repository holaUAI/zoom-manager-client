import { useQuery } from "@tanstack/react-query";
import { getAllHosts } from "../api/dashboard";

export const useHosts = () => {
    return useQuery({
        queryKey: ["hosts"],
        queryFn: async () => {
            const res = await getAllHosts();

            const rawData = res.data;

            // Filtrar por `user_name` no nulo y únicos
            const uniqueHosts = Object.values(
                rawData.reduce((acc, host) => {
                    if (host.user_name && !acc[host.user_name]) {
                        acc[host.user_name] = host;
                    }
                    return acc;
                }, {})
            );

            return uniqueHosts;
        }
    });
};