import { useQuery } from "@tanstack/react-query";
import { getByMeetingId } from "../api/dashboard";

export const useMeetingById = (meetingId) => {
    return useQuery({
        queryKey: ["meetingById", meetingId],
        queryFn: () => getByMeetingId(meetingId),
        enabled: !!meetingId,
        select: (res) => res?.data || null,
    });
};
