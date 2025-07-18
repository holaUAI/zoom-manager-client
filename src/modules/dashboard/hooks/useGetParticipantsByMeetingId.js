import { useQuery } from '@tanstack/react-query';
import { getParticipantsByMeetingId } from '../api/dashboard';

export const useParticipantsByMeetingId = (meetingId) => {
    return useQuery({
        queryKey: ['participants-by-meeting', meetingId],
        queryFn: () => getParticipantsByMeetingId(meetingId),
        enabled: !!meetingId,
    });
};