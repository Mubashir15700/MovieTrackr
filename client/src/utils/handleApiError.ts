import axios from "axios";
import toast from "react-hot-toast";

export const handleApiError = (logMessage: string, error: any) => {
    console.error(`${logMessage}:`, error);

    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Client or Server error response
            switch (error.response.status) {
                case 400:
                    toast.error("Bad Request: " + error.response.data.message);
                    break;
                case 401:
                    toast.error("Unauthorized: Please log in.");
                    break;
                case 404:
                    toast.error("Not Found: " + error.response.data.message);
                    break;
                case 500:
                    toast.error("Server Error: Please try again later.");
                    break;
                default:
                    toast.error("An error occurred: " + error.response.data.message);
            }
        } else if (error.request) {
            // Network error or no response
            toast.error("Network Error: Please check your connection.");
        } else {
            // Other unexpected errors
            toast.error("An unexpected error occurred: " + error.message);
        }
    } else {
        toast.error("An unexpected error occurred: " + error.message);
    }
};
