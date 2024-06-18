import { Router } from "express";
import {
    getMoviesHandler,
    addMovieHandler,
    editMovieHandler,
    deleteMovieHandler,
    updateWatchedStatusHandler,
    rateMovieHandler,
    reviewMovieHandler,
    deleteReviewHandler,
} from "../controllers/watchlistController.js";
import { checkAuthStatus } from "../middlewares/checkAuth.js";
import { validateMovie } from "../middlewares/validations/movieValidation.js";
import { validateReview } from "../middlewares/validations/reviewValidation.js";

const router = Router();

router.get("/movies", checkAuthStatus, getMoviesHandler);
router.post("/movies/add", checkAuthStatus, validateMovie, addMovieHandler);
router.put("/movies/:id", checkAuthStatus, validateMovie, editMovieHandler);
router.delete("/movies/:id", checkAuthStatus, deleteMovieHandler);
router.patch(
    "/movies/:id/updateWatchedStatus",
    checkAuthStatus,
    updateWatchedStatusHandler,
);
router.post("/movies/:id/rate", checkAuthStatus, rateMovieHandler);
router.post(
    "/movies/:id/review",
    checkAuthStatus,
    validateReview,
    reviewMovieHandler,
);
router.delete("/movies/:id/review", checkAuthStatus, deleteReviewHandler);

export default router;
