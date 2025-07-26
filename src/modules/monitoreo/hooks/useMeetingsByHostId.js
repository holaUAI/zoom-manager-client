import { useQuery } from '@tanstack/react-query';
import { getAllMeetingsByHostId } from '../api/meetings';

export const useMeetingsByHostId = (hostId) => {
    return useQuery({
        queryKey: ['meetingsByHost', hostId],
        queryFn: () => getAllMeetingsByHostId(hostId),
        enabled: !!hostId,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    });
};
