import axios from "axios"
import { Meta } from "react-router-dom"


const axiosURL = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    // headers: "content-type : application/json"
})

axiosURL.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    
    if(token) {
        config.headers.authorization =`Bearer ${token}`
    }
    return config;
}
)

export default axiosURL