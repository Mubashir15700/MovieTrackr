import express, { Request, Response } from "express";
import cors from "cors";
import {
    morganMiddleware,
    morganWinstonMiddleware,
} from "./middlewares/logging.ts";
import corsOptions from "./configs/corsOptions.ts";
import userRoutes from "./routes/userRoutes.ts";
import errorHandler from "./middlewares/errorHandler.ts";

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

// Use morganMiddleware for HTTP request logging
app.use(morganMiddleware); // Logs to http.log using morgan and also to Winston logger
app.use(morganWinstonMiddleware); // Logs to Winston logger only

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});

app.use("/api", userRoutes);

// Global error handling middleware
app.use(errorHandler);

export default app;
