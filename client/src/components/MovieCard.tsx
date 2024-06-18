import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/slices/watchlistSlice";
import ConfirmationDialog from "./ConfirmationDialog";
import MovieWatchStatusSelect from "./MovieWatchStatusSelect";
import ReviewSection from "./ReviewSection";
import RatingSection from "./RatingSection";
import { Movie, statusStringResponse } from "../interfaces/Movie";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    const dispatch = useDispatch();

    const { response, error, sendRequest } = useApiRequest<statusStringResponse>(
        `/watchlist/movies/${movie.movieId}`,
    );

    const handleRemoveMovie = async () => {
        const result = await ConfirmationDialog.confirmAction(
            "Are you sure?",
            "This movie will be removed",
            "Remove",
            "#3085d6",
            "Cancel",
        );

        if (result.isConfirmed) {
            try {
                await sendRequest("DELETE");
            } catch (err) {
                handleApiError("Removing movie failed", err);
            }
        }
    };

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(deleteMovie(movie.movieId));
        }

        if (error) {
            handleApiError("Removing movie failed", error);
        }
    }, [response, error, dispatch]);

    return (
        <div
            style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
            }}
        >
            <h5>Title {movie.title}</h5>
            <p>{movie.description}</p>
            <p>
                Release year: {movie.releaseYear}, genre: {movie.genre}
            </p>
            <p>{movie.isWatched ? "Watched" : "Unwatched"} </p>
            <MovieWatchStatusSelect
                movieId={movie.movieId}
                isWatched={movie.isWatched!}
            />
            <RatingSection movieId={movie.movieId} rating={movie.rating!} />
            <ReviewSection
                movieId={movie.movieId}
                rating={movie.rating!}
                review={movie.review!}
            />
            <Link to={`/edit-movie/${movie.movieId}`}>Edit Movie</Link>
            <button onClick={handleRemoveMovie}>Remove</button>
        </div>
    );
};

export default MovieCard;
