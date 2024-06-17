export interface Movie {
    movieId: string;
    title: string;
    description: string;
    releaseYear: number;
    genre: string[];
    isWatched?: boolean;
    rating?: number;
    review?: string;
}
