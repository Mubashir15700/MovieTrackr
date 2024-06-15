import { useState } from "react";
import axiosInstance from "../config/axiosConfig";

interface UseFetchResponse<T> {
    response: T | null;
    error: Error | null;
    loading: boolean;
    fetchData: () => Promise<void>;
}

const useFetch = <T,>(url: string): UseFetchResponse<T> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get<T>(url);
            setResponse(res.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error("An unknown error occurred"));
            }
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
};

export default useFetch;
