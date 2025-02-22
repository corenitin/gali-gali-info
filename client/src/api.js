import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
