import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../redux/slices/watchlistSlice";
import CustomTooltip from "../CustomToolTip";
import ConfirmationDialog from "../ConfirmationDialog";
import MovieWatchStatusSelect from "../MovieWatchStatusSelect";
import ReviewSection from "../ReviewSection/ReviewSection";
import RatingSection from "../RatingSection/RatingSection";
import { Movie, statusStringResponse } from "../../interfaces/Movie";
import useApiRequest from "../../hooks/useApiRequest";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./MovieCard.module.scss";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    const dispatch = useDispatch();

    const { response, sendRequest } =
        useApiRequest<statusStringResponse>(
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
            await sendRequest("DELETE");
        }
    };

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(deleteMovie(movie.movieId));
        }
    }, [response, dispatch]);

    return (
        <div className={styles.movieCard}>
            <div className={styles.movieCardHead}>
                <h5 className={styles.movieTitle}>
                    {movie.title}
                    <span className={styles.movieYear}>
                        ({movie.releaseYear})
                    </span>
                </h5>
                <div className={styles.buttonsContainer}>
                    <Link
                        to={`/edit-movie/${movie.movieId}`}
                        className={styles.movieEditButton}
                        id="editMovieIcon"
                    >
                        <FaPen />
                    </Link>
                    <CustomTooltip
                        id="edit-movie-icon-tooltip"
                        anchorSelect="#editMovieIcon"
                        place="bottom"
                        content="Edit this movie"
                    />
                    <button
                        className={styles.movieDeleteButton}
                        id="deleteMovieIcon"
                        onClick={handleRemoveMovie}
                    >
                        <MdDelete />
                    </button>
                    <CustomTooltip
                        id="delete-movie-icon-tooltip"
                        anchorSelect="#deleteMovieIcon"
                        place="bottom"
                        content="Remove this movie"
                    />
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
