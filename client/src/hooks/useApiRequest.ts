import { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { AxiosError } from "axios";

interface UseApiRequestResponse<T> {
    response: T | null;
    error: AxiosError<any> | null;
    loading: boolean;
    sendRequest: (method?: string, data?: any) => Promise<void>;
}

const useApiRequest = <T>(url: string): UseApiRequestResponse<T> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async (method: string = "GET", data: any = null) => {
        setLoading(true);
        try {
            let res;
            if (method === "GET") {
                res = await axiosInstance.get<T>(url);
            } else if (method === "POST") {
                res = await axiosInstance.post<T>(url, data);
            } else if (method === "PUT") {
                res = await axiosInstance.put<T>(url, data);
            } else if (method === "PATCH") {
                res = await axiosInstance.patch<T>(url, data);
            } else if (method === "DELETE") {
                res = await axiosInstance.delete<T>(url, { data });
            } else {
                throw new Error("Unsupported method");
            }
            setResponse(res.data);

            console.log("API Call Response: ", res);
        } catch (err: any) {
            console.log("API Call Error: ", err);

            if (err.isAxiosError) {
                setError(err);
            } else {
                setError({
                    ...err,
                    isAxiosError: false,
                    name: "AxiosError",
                    message: "An unknown error occurred",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, sendRequest };
};

export default useApiRequest;
