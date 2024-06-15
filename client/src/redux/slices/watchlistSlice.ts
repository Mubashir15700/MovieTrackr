import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
    movieId: string;
    title: string;
    description: string;
    releaseYear: number;
    genre: string[];
    isWatched?: boolean;
    rating?: number;
    review?: string;
}

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
            state.movies = action.payload;
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
    addMovie,
    editMovie,
    deleteMovie,
    rateMovie,
    reviewMovie,
    editReview,
    deleteReview,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
