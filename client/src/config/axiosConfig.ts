import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
    timeout: 10000, // 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
