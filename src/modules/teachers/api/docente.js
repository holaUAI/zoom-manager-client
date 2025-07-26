import { ms_sigu } from "../../shared/api/providers";

const URI = "/ms/v1/docente"

export const getAll = async () => {
    const { data } = await ms_sigu.get(`${URI}/all`);
    return data;
};