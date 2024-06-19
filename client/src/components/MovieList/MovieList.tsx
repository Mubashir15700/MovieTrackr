import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
    fetchWatchlistStart,
    fetchWatchlistSuccess,
    fetchWatchlistFailure,
} from "../../redux/slices/watchlistSlice";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../interfaces/Movie";
import useApiRequest from "../../hooks/useApiRequest";
import { handleApiError } from "../../utils/handleApiError";
import styles from "./MovieList.module.scss";

interface WatchlistResponse {
    status: string;
    data: {
        watchlist: Movie[];
    };
}

const MovieList = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<WatchlistResponse>("/watchlist/movies");

    const dispatch = useDispatch();

    const movies = useSelector((state: RootState) => state?.watchlist?.movies);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                dispatch(fetchWatchlistStart());
                await sendRequest("GET");
            } catch (err: any) {
                handleApiError("Failed to fetch movies", err);
                dispatch(fetchWatchlistFailure(err.message));
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(fetchWatchlistSuccess(response?.data?.watchlist));
        }

        if (error) {
            handleApiError("Error fetching movies", error);
            dispatch(fetchWatchlistFailure(error.message));
        }
    }, [response, error, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h4>Your Watchlist</h4>
            {movies?.length ? (
                <div className={styles.movieCardContainer}>
                    {movies.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </div>
            ) : (
                <div>Your watchlist is empty</div>
            )}
        </>
    );
};

export default MovieList;
