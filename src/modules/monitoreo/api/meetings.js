import { ms_meetings } from "../../shared/api/providers";

const URI = "/ms/v1/meeting"

export const getHostsMoreInfo = async () => {
    const { data } = await ms_meetings.get(`${URI}/get-hosts-more-info`);
    return data;
};

export const getAllMeetingsByHostId = async (hostId) => {
    const { data } = await ms_meetings.get(`${URI}/by-host/${hostId}`);
    return data;
};