import axios from "axios"


const axiosURL = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers: "content-type : application/json"
})
axiosURL.interceptors.request.use((config) => {
    const getToken = localStorage.getItem("tokenProfile")
    const userToken = getToken ? JSON.parse(getToken): ''
    
    if(userToken) {
        config.headers.authorization =`Bearer ${userToken.token}`
    }
    return config;
},
(err) => Promise.reject(err)
)

export default axiosURL