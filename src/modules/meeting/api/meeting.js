import { ms_meetings } from "../../shared/api/providers";

const URI = "/ms/v1/meeting"

export const getAll = async () => {
    const { data } = await ms_meetings.get(`${URI}/all`);
    return data;
};

export const getLastMeetings = async (limit) => {
    const { data } = await ms_meetings.get(`${URI}/last`, {
      params: { limit }
    });
    return data;
};