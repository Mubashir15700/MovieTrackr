import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.ts";
import catchAsync from "../utils/catchAsync.ts";
import { HttpStatusCode } from "../constants/httpStatusCodes.ts";

export const checkAuthHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        if (false) {
            throw new AppError(
                "User not authenticated",
                HttpStatusCode.UNAUTHORIZED,
            );
        }
    },
);

export const signupHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const loginHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const logoutHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);
