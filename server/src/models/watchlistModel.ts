import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "./userModel.js";

interface MovieDetails {
    movieId: string;
    title: string;
    description: string;
    releaseYear: number;
    genre: string[];
    isWatched?: boolean;
    rating?: number;
    review?: string;
}

export interface WatchlistDocument extends Document {
    user: UserDocument["_id"];
    movies: MovieDetails[];
}

const WatchlistSchema: Schema<WatchlistDocument> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movies: [
        {
            movieId: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            releaseYear: { type: Number, required: true },
            genre: { type: [String], required: true },
            isWatched: { type: Boolean, default: false },
            rating: { type: Number, default: 0 },
            review: { type: String },
        },
    ],
});

const Watchlist = mongoose.model<WatchlistDocument>(
    "Watchlist",
    WatchlistSchema,
);

export default Watchlist;
