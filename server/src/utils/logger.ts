import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Get the current file's absolute path and directory path
const logFilePath = (function() {
    const path = require('path');
    return path.resolve(path.dirname(''));
})();
const logDirPath = dirname(logFilePath);

// Navigate back two levels and then enter the "logs" directory
const logsDirPath = join(logDirPath, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirPath)) {
    fs.mkdirSync(logsDirPath);
}

// Configure Winston logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new DailyRotateFile({
            filename: join(logsDirPath, "error-%DATE%.log"),
            level: "error",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m", // Max size of each file
            maxFiles: "14d", // Retain logs for 14 days
        }),
        new DailyRotateFile({
            filename: join(logsDirPath, "warn-%DATE%.log"),
            level: "warn",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m", // Max size of each file
            maxFiles: "14d", // Retain logs for 14 days
        }),
        new DailyRotateFile({
            filename: join(logsDirPath, "info-%DATE%.log"),
            level: "info",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m", // Max size of each file
            maxFiles: "14d", // Retain logs for 14 days
        }),
    ],
});

// Optionally, add a console transport for development/debugging
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

export default logger;
