import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReviewSchema } from "../utils/validations/reviewSchema";

interface ReviewFormValues {
    review: string;
}

interface ReviewFormProps {
    onReviewSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewSubmit }) => {
    const initialValues: ReviewFormValues = {
        review: "",
    };

    const handleSubmit = async (
        values: ReviewFormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        console.log(values);
        onReviewSubmit();
        setSubmitting(false);
    };

    return (
        <div>
            <h1>Add a Review</h1>
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
