import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.ts";
import { HttpStatusCode } from "../constants/httpStatusCodes.ts";

export const createUsersTable = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        res.status(HttpStatusCode.CREATED).send(
            "Users table created successfully",
        );
    } catch (error: any) {
        next(
            new AppError(
                `Error creating users table: ${error.message}`,
                HttpStatusCode.INTERNAL_SERVER,
            ),
        );
    }
};
