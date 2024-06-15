import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.ts";
import catchAsync from "../utils/catchAsync.ts";
import { HttpStatusCode } from "../constants/httpStatusCodes.ts";

export const addMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const editMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const deleteMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const getMoviesHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const updateWatchedStatusHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const rateMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const reviewMovieHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const editReviewHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const deleteReviewHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);
