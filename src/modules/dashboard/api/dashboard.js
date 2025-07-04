import { ms_meetings } from "../../shared/api/providers";
import { n8n_api } from "../../shared/api/providers";

const URI_PARTICIPANTS =  "/ms/v1/participant";
const URI_MEETINGS = "/webhook/api/reuniones";

export const getAllHosts = async () => {
    const { data } = await ms_meetings.get(`${URI_PARTICIPANTS}/all-hosts`);
    return data;
};

export const getAllMeetings = async () => {
    const { data } = await n8n_api.get(`${URI_MEETINGS}/get-all`);
    return data;
};