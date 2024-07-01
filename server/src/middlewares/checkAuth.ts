import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/userModel";
import AppError from "../utils/AppError";
import { HttpStatusCode } from "../constants/httpStatusCodes";

declare module "express-serve-static-core" {
    interface Request {
        user?: UserDocument;
    }
}

export const checkAuthStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return next(new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
            userId: string;
            email: string;
        };

        const user = (await User.findById(decoded.userId)) as UserDocument;

        if (!user) {
            return next(
                new AppError("User not found", HttpStatusCode.NOT_FOUND),
            );
        }

        req.user = user;

        next();
    } catch (err) {
        console.error("Check auth status error:", err);

        if (err instanceof jwt.TokenExpiredError) {
            return next(
                new AppError("Token has expired", HttpStatusCode.UNAUTHORIZED),
            );
        } else if (err instanceof jwt.JsonWebTokenError) {
            return next(
                new AppError("Invalid token", HttpStatusCode.UNAUTHORIZED),
            );
        }

        next(
            new AppError("Unexpected token error", HttpStatusCode.UNAUTHORIZED),
        );
    }
};
