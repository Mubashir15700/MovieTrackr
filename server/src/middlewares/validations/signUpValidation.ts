import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import AppError from "../../utils/AppError.js";
import { HttpStatusCode } from "../../constants/httpStatusCodes.js";

export const validateSignup = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),

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
