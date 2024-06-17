import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/slices/watchlistSlice";
import ReviewForm from "./ReviewForm";
import ConfirmationDialog from "./ConfirmationDialog";
import MovieWatchStatusSelect from "./MovieWatchStatusSelect";
import { Movie } from "../interfaces/Movie";
import useApiRequest from "../hooks/useApiRequest";

interface DeleteMovieResponse {
    status: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    const [showReviewField, setShowReviewField] = useState(false);

    const dispatch = useDispatch();

    const handleReviewSubmit = () => {
        setShowReviewField(false);
    };

    const { response, error, loading, sendRequest } =
        useApiRequest<DeleteMovieResponse>(
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
                console.error("Removing movie error:", err);
                toast.error("Removing movie failed. Please try again.");
            }
        }
    };

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(deleteMovie(movie.movieId));
        }

        if (error) {
            console.log("Error Removing movie:", error);
            toast.error(
                "Error Removing movie:",
                error?.response?.data?.message,
            );
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
            <p>Rating</p>
            <p>
                Review...{" "}
                <button onClick={() => setShowReviewField(true)}>
                    Add/Edit
                </button>
            </p>
            {showReviewField ? (
                <ReviewForm onReviewSubmit={handleReviewSubmit} />
            ) : null}
            <Link to={`/edit-movie/${movie.movieId}`}>Edit Movie</Link>
            <button onClick={handleRemoveMovie}>Remove</button>
        </div>
    );
};

export default MovieCard;
