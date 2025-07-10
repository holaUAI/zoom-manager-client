import { useQuery } from '@tanstack/react-query';
import { getHostById } from '../api/dashboard';

export const useHostById = (hostId) => {
    return useQuery({
        queryKey: ['host-by-id', hostId],
        queryFn: () => getHostById(hostId),
        enabled: !!hostId,
    });
};
