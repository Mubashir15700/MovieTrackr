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
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./MovieCard.module.scss";

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
        <div className={styles.movieCard}>
            <div className={styles.movieCardHead}>
                <h5 className={styles.movieTitle}>
                    {movie.title}
                    <span className={styles.movieYear}>({movie.releaseYear})</span>
                </h5>
                <div>
                    <Link to={`/edit-movie/${movie.movieId}`}>
                        <FaPen />
                    </Link>
                    <button className={styles.movieDeleteButton} onClick={handleRemoveMovie}>
                        <MdDelete />
                    </button>
                </div>
            </div>
            <p className={styles.movieDescription}>{movie.description}</p>
            <div className={styles.movieGenreWatchStatus}>
                <span>genre: {movie.genre}</span> 
                <MovieWatchStatusSelect
                    movieId={movie.movieId}
                    isWatched={movie.isWatched!}
                />
            </div>
            <hr />
            <RatingSection movieId={movie.movieId} rating={movie.rating!} />
            <ReviewSection
                movieId={movie.movieId}
                rating={movie.rating!}
                review={movie.review!}
            />
        </div>
    );
};

export default MovieCard;
