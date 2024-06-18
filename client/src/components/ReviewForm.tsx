import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReviewSchema } from "../utils/validations/reviewSchema";

interface ReviewFormValues {
    review: string;
}

interface ReviewFormProps {
    review: string;
    onReviewSubmit: (review: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onReviewSubmit }) => {
    const initialValues: ReviewFormValues = {
        review,
    };

    const handleSubmit = async (
        value: ReviewFormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        onReviewSubmit(value.review);
        setSubmitting(false);
    };

    return (
        <div>
            <h1>{review.length ? "Update your review" : "Add a Review"}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={ReviewSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="review">Review</label>
                            <Field as="textarea" name="review" />
                            <ErrorMessage
                                name="review"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Review"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ReviewForm;
