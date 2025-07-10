import { ms_meetings } from "../../shared/api/providers";
const URI_USER = "/ms/v1/user";

export const getUserByEmail = async (email) => {
    const { data } = await ms_meetings.get(`${URI_USER}/by-email/${email}`);
    return data;
};