import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateWatchStatus } from "../redux/slices/watchlistSlice";
import useApiRequest from "../hooks/useApiRequest";

interface MovieWatchStatusSelectProps {
    movieId: string;
    isWatched: boolean;
}

interface UpdateMovieStatusResponse {
    status: string;
}

const MovieWatchStatusSelect: React.FC<MovieWatchStatusSelectProps> = ({
    movieId,
    isWatched,
}) => {
    const dispatch = useDispatch();

    const { response, error, loading, sendRequest } =
        useApiRequest<UpdateMovieStatusResponse>(
            `/watchlist/movies/${movieId}/updateWatchedStatus`,
        );

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(updateWatchStatus({ movieId, isWatched: !isWatched }));
        }

        if (error) {
            console.log("Error updating watch status:", error);
            toast.error(
                "Error updating watch status:",
                error?.response?.data?.message,
            );
        }
    }, [response, error, dispatch]);

    const handleChange = () => {
        sendRequest("PATCH", { movieId, isWatched: !isWatched });
    };

    return (
        <select
            value={isWatched ? "watched" : "unwatched"}
            onChange={handleChange}
        >
            <option value="watched">Watched</option>
            <option value="unwatched">Unwatched</option>
        </select>
    );
};

export default MovieWatchStatusSelect;
