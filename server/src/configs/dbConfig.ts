import mongoose from "mongoose";
import logger from "../utils/logger";
import AppError from "../utils/AppError";
import { HttpStatusCode } from "../constants/httpStatusCodes";

let isConnected = false; // Flag to track connection status

export const connectToDatabase = async () => {
    try {
        const URL = process.env.DB_CONNECTION_STRING;

        if (!URL) {
            throw new AppError(
                "Database URL not provided in environment variables.",
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }

        mongoose.set("strictQuery", false);
        await mongoose.connect(URL);

        logger.info("Connected to database succesfully.");
        isConnected = true; // Set isConnected to true on successful connection
    } catch (error: any) {
        logger.error("Error connecting to the database: ", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export const disconnectFromDatabase = async () => {
    try {
        if (isConnected) {
            await mongoose.connection.close();
            logger.info("Database disconnected succesfully");
            isConnected = false; // Reset isConnected on disconnection
        }
    } catch (error) {
        logger.error(`Error closing the database connection: ${error}`);
    }
};
