import axios from "axios"
import { store } from "../context/store";


const axiosURL = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers: "content-type : application/json"
})
axiosURL.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if(token) {
        config.headers.authorization =`Bearer ${token}`
    }
    return config;
},
(err) => Promise.reject(err)
)

export default axiosURL