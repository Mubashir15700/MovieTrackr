import * as Yup from "yup";

export const MovieSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
        .required("Description is required")
        .max(100, 'Description must be at most 100 characters'),
    releaseYear: Yup.number()
        .typeError("Release year must be numeric")
        .required("Release year is required")
        .integer("Release year must be an integer")
        .min(1900, "Release year must be at least 1900")
        .max(new Date().getFullYear(), "Release year cannot be in future"),
    genre: Yup.array().of(Yup.string()).min(1, "Genre is required"),
});
