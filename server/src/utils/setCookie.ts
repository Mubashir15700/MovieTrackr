import { Response } from "express";

interface CookieOptions {
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite?: "strict" | "lax" | "none" | boolean;
}

const setCookie = (
    res: Response,
    cookieName: string,
    token: string,
    options = {},
) => {
    const defaultOptions: CookieOptions = {
        maxAge: 60000 * 60 * 24 * 7,
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "strict",
    };

    const mergedOptions = { ...defaultOptions, ...options };

    res.cookie(cookieName, token, mergedOptions);
};

export default setCookie;
