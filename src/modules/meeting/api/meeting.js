import { ms_meetings } from "../../shared/api/providers";

const URI = "/ms/v1/meeting"

export const getAll = async () => {
    const { data } = await ms_meetings.get(`${URI}/all`);
    return data;
};

