import { useState } from "react";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const MovieCard = () => {
    const [showReviewField, setShowReviewField] = useState(false);

    const handleReviewSubmit = () => {
        setShowReviewField(false);
    };

    return (
        <div>
            <h5>Movie Title</h5>
            <p>Movie Description</p>
            <p>Release year, genre</p>
            <p>Rating</p>
            <p>Review... <button onClick={() => setShowReviewField(true)}>Add/Edit</button></p>
            {showReviewField ? <ReviewForm onReviewSubmit={handleReviewSubmit} /> : null}
            <Link to="/edit-movie">Edit Movie</Link>
            <button>Remove</button>
        </div>
    )
}

export default MovieCard;
