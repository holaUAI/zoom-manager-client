import { ms_sigu } from "../../shared/api/providers";

const URI = "/ms/v1/reunion";

export const getAll = async (page = 1, limit = 20) => {
  const { data } = await ms_sigu.get(`${URI}/all?page=${page}&limit=${limit}`);
  return data;
};
