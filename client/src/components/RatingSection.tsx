import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editMovie } from "../redux/slices/watchlistSlice";
import { addUpdateResponse } from "../interfaces/Movie";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";
import styles from "./RatingSection.module.scss";

interface RatingProps {
    movieId: string;
    rating: number;
}

const RatingSection: React.FC<RatingProps> = ({ movieId, rating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const dispatch = useDispatch();

    const { response, error, sendRequest } = useApiRequest<addUpdateResponse>(
        `/watchlist/movies/${movieId}/rate`,
    );

    useEffect(() => {
        if (response && response.status === "success") {
            dispatch(editMovie(response?.data?.movie));
        }

        if (error) {
            handleApiError("Error rating movie", error);
        }
    }, [response, error, dispatch]);

    const handleMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (index: number) => {
        sendRequest("POST", { movieId, rating: index + 1 });
    };

    return (
        <div className={styles.ratingContainer}>
            <p>Rating:
                {[1, 2, 3, 4, 5].map((index) => (
                    <span
                        key={index}
                        style={{
                            cursor: "pointer",
                            color:
                                index <= (hoverRating || rating) ? "gold" : "grey",
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
                        ★
                    </span>
                ))}
            </p>
        </div>
    );
};

export default RatingSection;
