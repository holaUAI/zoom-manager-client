import { n8n_api } from "../../shared/api/providers";

const URI = "/webhook/api/reuniones"

export const getAll = async () => {
    const { data } = await n8n_api.get(`${URI}/get-all`);
    return data;
};

