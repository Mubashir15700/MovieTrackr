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

export interface statusStringResponse {
    status: string;
}

export interface addUpdateResponse {
    status: string;
    data: {
        movie: Movie;
    };
}
