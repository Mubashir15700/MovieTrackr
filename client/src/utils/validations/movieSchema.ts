import * as Yup from "yup";

export const MovieSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    releaseYear: Yup.number()
        .typeError("Release year must be numeric")
        .required("Release year is required"),
    genre: Yup.array().of(Yup.string()).min(1, "Genre is required"),
});
