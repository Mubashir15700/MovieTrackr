import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './userModel';

// Interface for Watchlist document
export interface WatchlistDocument extends Document {
    user: UserDocument['_id'];
    movies: mongoose.Types.ObjectId[];
}

// Define Watchlist schema
const WatchlistSchema: Schema<WatchlistDocument> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

const Watchlist = mongoose.model<WatchlistDocument>('Watchlist', WatchlistSchema);

export default Watchlist;
