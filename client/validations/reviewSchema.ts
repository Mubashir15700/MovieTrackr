import * as Yup from "yup";

export const ReviewSchema = Yup.object().shape({
    review: Yup.string()
        .max(200, "Review cannot exceed 200 characters")
        .required("Review is required"),
});
