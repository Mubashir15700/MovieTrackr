import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ReviewForm from "./ReviewForm";
import ConfirmationDialog from "./ConfirmationDialog";

const MovieCard = () => {
    const [showReviewField, setShowReviewField] = useState(false);

    const handleReviewSubmit = () => {
        setShowReviewField(false);
    };

    const handleRemoveMovie = async () => {
        const result = await ConfirmationDialog.confirmAction(
            "Are you sure?",
            "This movie will be removed",
            "Remove",
            "#3085d6",
            "Cancel",
        );

        if (result.isConfirmed) {
            try {
                console.log("Remove movie");
            } catch (err) {
                console.error("Remove movie error:", err);
                toast.error("Remove movie failed. Please try again.");
            }
        }
    };

    return (
        <div>
            <h5>Movie Title</h5>
            <p>Movie Description</p>
            <p>Release year, genre</p>
            <p>Rating</p>
            <p>
                Review...{" "}
                <button onClick={() => setShowReviewField(true)}>
                    Add/Edit
                </button>
            </p>
            {showReviewField ? (
                <ReviewForm onReviewSubmit={handleReviewSubmit} />
            ) : null}
            <Link to="/edit-movie">Edit Movie</Link>
            <button onClick={handleRemoveMovie}>Remove</button>
        </div>
    );
};

export default MovieCard;
