import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../constants/httpStatusCodes.ts';
import AppError from '../utils/AppError.ts';
import User from '../models/userModel.ts';

export const checkAuthStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        throw new AppError('Unauthorized', HttpStatusCode.UNAUTHORIZED);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

        const user = await User.findById((decoded as any).id);

        if (!user) {
            throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
        }

        req.user = user;

        next();
    } catch (err) {
        console.error("Check auth status error:", err);

        if (err instanceof jwt.TokenExpiredError) {
            throw new AppError(
                "Token has expired",
                HttpStatusCode.UNAUTHORIZED,
            );
        } else if (err instanceof jwt.JsonWebTokenError) {
            throw new AppError(
                "Invalid token",
                HttpStatusCode.UNAUTHORIZED,
            );
        }
        
        throw new AppError(
            "Unexpected token error",
            HttpStatusCode.UNAUTHORIZED,
        );
    }
};
