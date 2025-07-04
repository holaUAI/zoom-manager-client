import axios from "axios";

export const createAxios = (baseURL) =>
    axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
        },
    });
