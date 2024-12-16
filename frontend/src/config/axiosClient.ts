import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://my-finance-web.onrender.com",
    withCredentials: true
})

export default axiosClient;