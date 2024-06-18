import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, editMovie } from "../redux/slices/watchlistSlice";
import { RootState } from "../redux/rootReducer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MovieSchema } from "../utils/validations/movieSchema";
import { addUpdateResponse } from "../interfaces/Movie";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";
import styles from "./MovieForm.module.scss";

interface MovieFormValues {
    movieId?: string;
    title: string;
    description: string;
    releaseYear: number | "";
    genre: string[];
}

interface MovieFormProps {
    purpose: "add" | "edit";
    id?: string;
}

const MovieForm: React.FC<MovieFormProps> = ({ purpose, id }) => {
    const endPoint =
        purpose === "add" ? "/watchlist/movies/add" : `/watchlist/movies/${id}`;

    const { response, error, sendRequest } =
        useApiRequest<addUpdateResponse>(endPoint);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (response?.status === "success") {
            const movie = response?.data?.movie;
            purpose === "add"
                ? dispatch(addMovie(movie))
                : dispatch(editMovie(movie));
            navigate("/");
        } else if (error) {
            handleApiError(
                purpose === "add"
                    ? "Adding"
                    : "Editing" + "movie failed", error,
            );
        }
    }, [response, error, navigate]);

    const handleSubmit = async (values: MovieFormValues) => {
        try {
            const method = purpose === "add" ? "POST" : "PUT";
            await sendRequest(method, values);
        } catch (err) {
            handleApiError(purpose === "add"
                ? "Adding"
                : "Editing" + "movie failed", err);
        }
    };

    const movieToEdit = useSelector((state: RootState) =>
        state.watchlist.movies.find((movie) => movie.movieId === id),
    );

    const initialValues: MovieFormValues = {
        movieId: id || "",
        title: movieToEdit?.title || "",
        description: movieToEdit?.description || "",
        releaseYear: movieToEdit?.releaseYear || "",
        genre: movieToEdit?.genre || [],
    };

    return (
        <div className={styles.movieFormContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={MovieSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.movieForm}>
                        <h1>{purpose === "add" ? "Add a New Movie" : "Edit Movie"}</h1>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.label}>Title</label>
                            <Field type="text" name="title" className={styles.input} />
                            <ErrorMessage
                                name="title"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description" className={styles.label}>Description</label>
                            <Field as="textarea" name="description" className={styles.descriptionInput} />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="releaseYear" className={styles.label}>Release Year</label>
                            <Field type="text" name="releaseYear" className={styles.input} />
                            <ErrorMessage
                                name="releaseYear"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="genre" className={styles.label}>Genre</label>
                            <Field as="select" name="genre" className={styles.genreInput} multiple>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                            </Field>
                            <ErrorMessage
                                name="genre"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MovieForm;
