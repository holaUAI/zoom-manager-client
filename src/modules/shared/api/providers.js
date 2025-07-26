import { createAxios } from "./createAxios";

export const ms_meetings = createAxios(import.meta.env.VITE_API_BASE_DOMAIN_MS_MEETING);

export const ms_sigu = createAxios(import.meta.env.VITE_API_BASE_DOMAIN_MS_SIGU);