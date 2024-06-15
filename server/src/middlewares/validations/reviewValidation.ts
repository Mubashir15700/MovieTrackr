import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import AppError from "../../utils/AppError.ts";
import { HttpStatusCode } from "../../constants/httpStatusCodes.ts";

export const validateReview = [
    body("review")
        .isString()
        .withMessage("Review must be a string")
        .isLength({ max: 200 })
        .withMessage("Review cannot exceed 1000 characters"),

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
