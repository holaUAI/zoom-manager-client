import axios from "../../shared/api/axiosInstance";

const URI = "/webhook/api/reuniones"

export const getAll = async () => {
    const { data } = await axios.get(`${URI}/get-all`);
    return data;
};