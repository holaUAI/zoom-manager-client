import { createAxios } from "./createAxios";

export const n8n_api = createAxios(import.meta.env.VITE_API_BASE_DOMAIN_N8N);
export const ms_meetings = createAxios(import.meta.env.VITE_API_BASE_DOMAIN_MS_MEETING);