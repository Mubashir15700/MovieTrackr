import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
    morganMiddleware,
    morganWinstonMiddleware,
} from "./middlewares/logging";
import checkEnvVariables from "./utils/checkENVs";
import corsOptions from "./configs/corsOptions";
import authRoutes from "./routes/authRoutes";
import watchlistRoutes from "./routes/watchlistRoutes";
import errorHandler from "./middlewares/errorHandler";
import AppError from "./utils/AppError";

dotenv.config();

checkEnvVariables();

const app = express();

app.use(helmet()); // to secure the Express app by setting various HTTP headers
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Use morganMiddleware for HTTP request logging
app.use(morganMiddleware); // Logs to http.log using morgan and also to Winston logger
app.use(morganWinstonMiddleware); // Logs to Winston logger only

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.get("/test", (req, res) => {
    res.send("Hello World!");
});

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(errorHandler);

export default app;
