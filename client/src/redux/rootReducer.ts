import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import watchlistReducer from "./slices/watchlistSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    movie: watchlistReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
