import { useQuery } from '@tanstack/react-query';
import { getHostsMoreInfo } from '../api/meetings';

export const useHostsMoreInfo = () => {
    return useQuery({
        queryKey: ['hostsMoreInfo'],
        queryFn: getHostsMoreInfo,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false
    });
};
