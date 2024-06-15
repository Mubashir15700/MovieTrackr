import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
// Import other slices/reducers as needed
import { RootState } from "./types"; // Import root state interface

// Define initial state if needed
const initialState: RootState = {};

const store = configureStore({
    reducer: {
        counter: counterReducer,
        // Add other slices/reducers here
    },
    preloadedState: initialState,
});

export default store;
