import axios from "axios"

const URL = import.meta.env.MODE == "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: URL
})

export default api;
