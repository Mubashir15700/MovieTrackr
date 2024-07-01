import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import setCookie from "../utils/setCookie";
import generateToken from "../utils/generateToken";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { HttpStatusCode } from "../constants/httpStatusCodes";

export const checkAuthHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt_token;

        if (!token) {
            throw new AppError(
                "Please log in.",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        let decoded: JwtPayload;

        try {
            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY!,
            ) as JwtPayload;
        } catch (err: any) {
            console.error("Token verification error:", err);

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

        const currentUser = await User.findById(decoded.userId);

        if (!currentUser) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
        }

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                token,
                user: currentUser,
            },
        });
    },
);

export const signupHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        const foundUser = await User.findOne({ email });

        if (foundUser) {
            throw new AppError(
                "This email is already taken",
                HttpStatusCode.CONFLICT,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = await generateToken("" + savedUser._id, savedUser.email);

        setCookie(res, "jwt_token", token, { maxAge: 60000 * 30 });

        res.status(HttpStatusCode.CREATED).json({
            status: "success",
            data: {
                token,
                user: savedUser,
            },
        });
    },
);

export const loginHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            foundUser.password,
        );
        
        if (!isPasswordValid) {
            throw new AppError(
                "Invalid credentials",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const token = await generateToken("" + foundUser._id, foundUser.email);

        setCookie(res, "jwt_token", token, { maxAge: 60000 * 30 });

        res.status(HttpStatusCode.OK).json({
            status: "success",
            data: {
                token,
                user: foundUser,
            },
        });
    },
);

export const logoutHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        setCookie(res, "jwt_token", "", { maxAge: 0 });

        res.status(HttpStatusCode.OK).json({ status: "success" });
    },
);
