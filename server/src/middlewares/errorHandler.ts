import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import AppError from "../utils/AppError";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("------- ERR -------", err);

    let statusCode: number;
    let message: string;

    // Check if the error is an instance of AppError
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        // Default to 500 Internal Server Error for non-AppError errors
        statusCode = 500;
        message = "Please try again later";
    }

    logger.error(`Error: ${message}, Status Code: ${statusCode}`);

    // Ensure response headers are sent
    if (res.headersSent) {
        return next(err);
    }

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
};

export default errorHandler;
