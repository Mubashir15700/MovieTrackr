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
import { checkAuthStatus } from "../middlewares/checkAuth.ts";
import { validateMovie } from "../middlewares/validations/movieValidation.ts";
import { validateReview } from "../middlewares/validations/reviewValidation.ts";

const router = Router();

router.post("/movies/add", checkAuthStatus, validateMovie, addMovieHandler);
router.put("/movies/:id", checkAuthStatus, validateMovie, editMovieHandler);
router.delete("/movies/:id", checkAuthStatus, deleteMovieHandler);
router.get("/movies", checkAuthStatus, getMoviesHandler);
router.patch("/movies/:id/updateWatchedStatus", checkAuthStatus, updateWatchedStatusHandler);
router.post("/movies/:id/rate", checkAuthStatus, rateMovieHandler);
router.post("/movies/:id/review", checkAuthStatus, validateReview, reviewMovieHandler);
router.patch("/movies/:id/review", checkAuthStatus, validateReview, editReviewHandler);
router.delete("/movies/:id/review", checkAuthStatus, deleteReviewHandler);

export default router;
