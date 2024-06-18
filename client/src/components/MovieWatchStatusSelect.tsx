import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateWatchStatus } from "../redux/slices/watchlistSlice";
import { statusStringResponse } from "../interfaces/Movie";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";

interface MovieWatchStatusSelectProps {
    movieId: string;
    isWatched: boolean;
}

const MovieWatchStatusSelect: React.FC<MovieWatchStatusSelectProps> = ({
    movieId,
    isWatched,
}) => {
    const dispatch = useDispatch();

    const { response, error, sendRequest } =
        useApiRequest<statusStringResponse>(
            `/watchlist/movies/${movieId}/updateWatchedStatus`,
        );

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(updateWatchStatus({ movieId, isWatched: !isWatched }));
        }

        if (error) {
            handleApiError("Error updating watch status", error);
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
