import express from "express";
import helmet from "helmet";
import cors from "cors";
import {
    morganMiddleware,
    morganWinstonMiddleware,
} from "./middlewares/logging.ts";
import checkEnvVariables from "./utils/checkENVs.ts";
import corsOptions from "./configs/corsOptions.ts";
import authRoutes from "./routes/authRoutes.ts";
import watchlistRoutes from "./routes/watchlistRoutes.ts";
import errorHandler from "./middlewares/errorHandler.ts";

checkEnvVariables();

const app = express();

app.use(helmet()); // to secure the Express app by setting various HTTP headers
app.use(express.json());
app.use(cors(corsOptions));

// Use morganMiddleware for HTTP request logging
app.use(morganMiddleware); // Logs to http.log using morgan and also to Winston logger
app.use(morganWinstonMiddleware); // Logs to Winston logger only

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Global error handling middleware
app.use(errorHandler);

export default app;
