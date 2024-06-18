import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
    morganMiddleware,
    morganWinstonMiddleware,
} from "./middlewares/logging.js";
import checkEnvVariables from "./utils/checkENVs.js";
import corsOptions from "./configs/corsOptions.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

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

// Global error handling middleware
app.use(errorHandler);

export default app;
