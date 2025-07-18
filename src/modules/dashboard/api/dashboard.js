import { ms_meetings } from "../../shared/api/providers";

const URI_RATINGS = "/ms/v1/rating";
const URI_MEETTINGS_MS = "/ms/v1/meeting";
const URI_PARTICIPANTS_MS = "/ms/v1/participant";

export const getAllGroupedToday = async () => {
    const { data } = await ms_meetings.get(`${URI_MEETTINGS_MS}/grouped-today`);
    return data;
};

export const getTopDelayedHosts = async () => {
    const { data } = await ms_meetings.get(`${URI_MEETTINGS_MS}/top-delayed-hosts`);
    return data;
};

export const getTopTutorsRated = async () => {
    const { data } = await ms_meetings.get(`${URI_RATINGS}/top-rated`);
    return data;
};

export const getByMeetingId = async (id) => {
    const { data } = await ms_meetings.get(`${URI_MEETTINGS_MS}/by-meeting-id/${id}`);
    return data;
};

export const getHostById = async (id) => {
    const { data } = await ms_meetings.get(`${URI_PARTICIPANTS_MS}/by-host-id/${id}`);
    return data;
};

export const getParticipantsByMeetingId = async (id) => {
    const { data } = await ms_meetings.get(`${URI_PARTICIPANTS_MS}/all-participants-by-meeting/${id}`);
    return data;
};