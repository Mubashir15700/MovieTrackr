import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import AppError from "../../utils/AppError.js";
import { HttpStatusCode } from "../../constants/httpStatusCodes.js";

export const validateMovie = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 100 }).withMessage("Description must be at most 100 characters"),
    body("releaseYear").isNumeric().withMessage("Release year must be numeric"),
    body("genre").notEmpty().withMessage("Genre is required"),

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
