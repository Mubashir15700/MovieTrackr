import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReviewSchema } from "../../utils/validations/reviewSchema";
import styles from "./ReviewForm.module.scss";

interface ReviewFormValues {
    review: string;
}

interface ReviewFormProps {
    review: string;
    setShowReviewField: React.Dispatch<React.SetStateAction<boolean>>;
    onReviewSubmit: (review: string) => void;
    loading: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    review,
    setShowReviewField,
    onReviewSubmit,
    loading,
}) => {
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
        <div className={styles.reviewFormContainer}>
            <h4>{review?.length ? "Update your review" : "Add a Review"}</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={ReviewSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field
                                as="textarea"
                                name="review"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="review"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.reviewSubmitButton}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        <button onClick={() => setShowReviewField(false)}>
                            Discard
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ReviewForm;
