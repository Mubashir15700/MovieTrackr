import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../interfaces/Movie";

interface WatchlistState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: WatchlistState = {
    movies: [],
    loading: false,
    error: null,
};

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        fetchWatchlistStart(state) {
            state.loading = true;
            state.error = null;
        },

        fetchWatchlistSuccess(state, action: PayloadAction<Movie[]>) {
            state.loading = false;
            state.movies = action.payload; // Assign the array of movies
            state.error = null; // Reset error state upon success
        },

        fetchWatchlistFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        addMovie(state, action: PayloadAction<Movie>) {
            state.movies.push(action.payload);
        },

        editMovie(state, action: PayloadAction<Movie>) {
            const { movieId } = action.payload;
            const index = state.movies.findIndex(
                (movie) => movie.movieId === movieId,
            );
            if (index !== -1) {
                state.movies[index] = action.payload;
            }
        },

        deleteMovie(state, action: PayloadAction<string>) {
            state.movies = state.movies.filter(
                (movie) => movie.movieId !== action.payload,
            );
        },

        rateMovie(
            state,
            action: PayloadAction<{ movieId: string; rating: number }>,
        ) {
            const { movieId, rating } = action.payload;
            const index = state.movies.findIndex(
                (movie) => movie.movieId === movieId,
            );
            if (index !== -1) {
                state.movies[index].rating = rating;
            }
        },

        reviewMovie(
            state,
            action: PayloadAction<{ movieId: string; review: string }>,
        ) {
            const { movieId, review } = action.payload;
            const index = state.movies.findIndex(
                (movie) => movie.movieId === movieId,
            );
            if (index !== -1) {
                state.movies[index].review = review;
            }
        },

        editReview(
            state,
            action: PayloadAction<{ movieId: string; review: string }>,
        ) {
            const { movieId, review } = action.payload;
            const index = state.movies.findIndex(
                (movie) => movie.movieId === movieId,
            );
            if (index !== -1) {
                state.movies[index].review = review;
            }
        },

        deleteReview(state, action: PayloadAction<string>) {
            const index = state.movies.findIndex(
                (movie) => movie.movieId === action.payload,
            );
            if (index !== -1) {
                state.movies[index].review = undefined;
            }
        },
    },
});

export const {
    fetchWatchlistStart,
    fetchWatchlistSuccess,
    fetchWatchlistFailure,
    addMovie,
    editMovie,
    deleteMovie,
    rateMovie,
    reviewMovie,
    editReview,
    deleteReview,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
