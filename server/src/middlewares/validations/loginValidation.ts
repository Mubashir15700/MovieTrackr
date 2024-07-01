import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import AppError from "../../utils/AppError";
import { HttpStatusCode } from "../../constants/httpStatusCodes";

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors
                .array()
                .map((error) => error.msg)
                .join(". ");
            throw new AppError(
                `Validation failed: ${errorMessages}`,
                HttpStatusCode.BAD_REQUEST,
            );
        }
        next();
    },
];
