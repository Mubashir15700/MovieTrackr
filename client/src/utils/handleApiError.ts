import axios from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: any) => {
    console.error(`API Err handler: `, error);

    let errorPrefix = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Client or Server error response
            switch (error.response.status) {
                case 400:
                    errorPrefix = "Bad Request";
                    break;
                case 401:
                    errorPrefix = "Unauthorized";
                    break;
                case 404:
                    errorPrefix = "Not Found";
                    break;
                case 500:
                    errorPrefix = "Internal Server Error";
                    break;
                default:
                    errorPrefix = "An error occurred";
            }

            toast.error(`${errorPrefix}: ${error.response.data.message}`);
        } else if (error.request) {
            // Network error or no response
            toast.error(`${error.message}: Connection refused`);
        } else {
            // Other unexpected errors
            toast.error(`${errorPrefix}: ${error.message}`);
        }
    } else {
        toast.error(`${errorPrefix}: ${error.message}`);
    }
};
