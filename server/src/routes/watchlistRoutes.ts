import { Router } from "express";
import {
    addMovieHandler,
    editMovieHandler,
    deleteMovieHandler,
    getMoviesHandler,
    updateWatchedStatusHandler,
    rateMovieHandler,
    reviewMovieHandler,
    editReviewHandler,
    deleteReviewHandler,
} from "../controllers/watchlistController.ts";
import { validateMovie } from "../middlewares/validations/movieValidation.ts";
import { validateReview } from "../middlewares/validations/reviewValidation.ts";

const router = Router();

router.post("/movies/add", validateMovie, addMovieHandler);
router.put("/movies/:id", validateMovie, editMovieHandler);
router.delete("/movies/:id", deleteMovieHandler);
router.get("/movies", getMoviesHandler);
router.patch("/movies/:id/updateWatchedStatus", updateWatchedStatusHandler);
router.post("/movies/:id/rate", rateMovieHandler);
router.post("/movies/:id/review", validateReview, reviewMovieHandler);
router.patch("/movies/:id/review", validateReview, editReviewHandler);
router.delete("/movies/:id/review", deleteReviewHandler);

export default router;
