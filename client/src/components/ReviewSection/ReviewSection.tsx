import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editMovie } from "../../redux/slices/watchlistSlice";
import ReviewForm from "../ReviewForm/ReviewForm";
import { addUpdateResponse } from "../../interfaces/Movie";
import useApiRequest from "../../hooks/useApiRequest";
import { handleApiError } from "../../utils/handleApiError";
import styles from "./ReviewSection.module.scss";

interface ReviewSectionProps {
    movieId: string;
    rating: number;
    review: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ movieId, review }) => {
    const [showReviewField, setShowReviewField] = useState(false);

    const dispatch = useDispatch();

    const { response, error, loading, sendRequest } =
        useApiRequest<addUpdateResponse>(`/watchlist/movies/${movieId}/review`);

    const handleReviewSubmit = (review: string) => {
        sendRequest("POST", { movieId, review });
    };

    const handleDeleteReview = () => {
        sendRequest("DELETE");
    };

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(editMovie(response?.data?.movie));
        }

        if (error) {
            handleApiError("Error reviewing movie", error);
        }

        setShowReviewField(false);
    }, [response, error, dispatch]);

    return (
        <div className={styles.reviewContainer}>
            {review?.length && <p>Review: </p>}
            <p>
                {review}
                {!showReviewField && (
                    <div className={styles.reviewButtons}>
                        <button onClick={() => setShowReviewField(true)}>
                            {review ? "Edit" : "Add"} review
                        </button>
                        {review?.length && (
                            <button onClick={handleDeleteReview}>
                                {loading ? "Deleting..." : "Delete Review"}
                            </button>
                        )}
                    </div>
                )}
            </p>
            {showReviewField ? (
                <ReviewForm
                    review={review}
                    setShowReviewField={setShowReviewField}
                    onReviewSubmit={handleReviewSubmit}
                    loading={loading}
                />
            ) : null}
        </div>
    );
};

export default ReviewSection;
