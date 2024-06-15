import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
    id: string;
    name: string;
    description: string;
    // image: string;
    releaseYear: number;
    genre: string;
}

interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
            state.loading = false;
            state.movies = action.payload;
        },
        fetchMoviesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addMovie(state, action: PayloadAction<Movie>) {
            state.movies.push(action.payload);
        },
        editMovie(state, action: PayloadAction<Movie>) {
            const { id } = action.payload;
            const index = state.movies.findIndex(movie => movie.id === id);
            if (index !== -1) {
                state.movies[index] = action.payload;
            }
        },
        removeMovie(state, action: PayloadAction<string>) {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
        }
    },
});

export const {
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesFailure,
    addMovie,
    editMovie,
    removeMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
