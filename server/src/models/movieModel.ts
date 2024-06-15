import mongoose, { Document, Schema } from 'mongoose';

export interface MovieDocument extends Document {
    title: string;
    description: string;
    // image: string;
    releaseYear: number;
    genre: string;
    isWatched: boolean;
    // Add more fields as needed
}

const MovieSchema: Schema<MovieDocument> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // image: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true },
    isWatched: { type: Boolean, default: false }
});

const Movie = mongoose.model<MovieDocument>('Movie', MovieSchema);

export default Movie;
