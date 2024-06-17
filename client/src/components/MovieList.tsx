import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import MovieCard from "./MovieCard";
import useApiRequest from "../hooks/useApiRequest";
import { RootState } from "../redux/rootReducer";
import {
    fetchWatchlistStart,
    fetchWatchlistSuccess,
    fetchWatchlistFailure,
} from "../redux/slices/watchlistSlice";
import { Movie } from "../interfaces/Movie";

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
                console.error("Fetch movies error:", err);
                toast.error("Failed to fetch movies. Please try again.");
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
            console.log("Error fetching movies:", error);
            toast.error(error?.response?.data?.message);
            dispatch(fetchWatchlistFailure(error.message));
        }
    }, [response, error, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>MovieList</div>
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </>
    );
};

export default MovieList;
