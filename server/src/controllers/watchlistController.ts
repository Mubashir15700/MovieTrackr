import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import Watchlist from "../models/watchlistModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { HttpStatusCode } from "../constants/httpStatusCodes.js";

export const addMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            title,
            description,
            releaseYear,
            genre,
            isWatched,
            rating,
            review,
        } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const newMovie = {
            movieId: uuidv4(),
            title,
            description,
            releaseYear,
            genre,
            isWatched: isWatched || false,
            rating,
            review,
        };

        let watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            watchlist = await Watchlist.create({ user: userId, movies: [] });
        }

        watchlist.movies.push(newMovie);
        await watchlist.save();

        res.status(HttpStatusCode.CREATED).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const editMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            movieId,
            title,
            description,
            releaseYear,
            genre,
            isWatched,
            rating,
            review,
        } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        const index = watchlist.movies.findIndex(
            (movie) => movie.movieId === movieId,
        );

        if (index === -1) {
            throw new AppError(
                "Movie not found in watchlist",
                HttpStatusCode.NOT_FOUND,
            );
        }

        watchlist.movies[index] = {
            ...watchlist.movies[index],
            title,
            description,
            releaseYear,
            genre,
            isWatched,
            rating,
            review,
        };

        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const deleteMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { movieId } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        watchlist.movies = watchlist.movies.filter(
            (movie) => movie.movieId !== movieId,
        );
        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const getMoviesHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req?.user?._id;

        if (!userId) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const existingWatchlist = await Watchlist.findOne({
            user: userId,
        }).populate("user");

        const watchlist = existingWatchlist
            ? existingWatchlist
            : { movies: [] };

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const updateWatchedStatusHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { movieId, isWatched } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        const index = watchlist.movies.findIndex(
            (movie) => movie.movieId === movieId,
        );

        if (index === -1) {
            throw new AppError(
                "Movie not found in watchlist",
                HttpStatusCode.NOT_FOUND,
            );
        }

        watchlist.movies[index].isWatched = isWatched;
        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const rateMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { movieId, rating } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        const index = watchlist.movies.findIndex(
            (movie) => movie.movieId === movieId,
        );

        if (index === -1) {
            throw new AppError(
                "Movie not found in watchlist",
                HttpStatusCode.NOT_FOUND,
            );
        }

        watchlist.movies[index].rating = rating;
        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const reviewMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { movieId, review } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        const index = watchlist.movies.findIndex(
            (movie) => movie.movieId === movieId,
        );

        if (index === -1) {
            throw new AppError(
                "Movie not found in watchlist",
                HttpStatusCode.NOT_FOUND,
            );
        }

        watchlist.movies[index].review = review;
        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const editReviewHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { movieId, review } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        const index = watchlist.movies.findIndex(
            (movie) => movie.movieId === movieId,
        );

        if (index === -1) {
            throw new AppError(
                "Movie not found in watchlist",
                HttpStatusCode.NOT_FOUND,
            );
        }

        watchlist.movies[index].review = review;
        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);

export const deleteReviewHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { movieId } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            throw new AppError(
                "User not authenticated or missing user ID",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            throw new AppError("Watchlist not found", HttpStatusCode.NOT_FOUND);
        }

        const index = watchlist.movies.findIndex(
            (movie) => movie.movieId === movieId,
        );

        if (index === -1) {
            throw new AppError(
                "Movie not found in watchlist",
                HttpStatusCode.NOT_FOUND,
            );
        }

        watchlist.movies[index].review = undefined;
        await watchlist.save();

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                watchlist: watchlist.movies,
            },
        });
    },
);
