import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addMovie, editMovie } from "../redux/slices/watchlistSlice";
import { MovieSchema } from "../utils/validations/movieSchema";
import useApiRequest from "../hooks/useApiRequest";
import { Movie } from "../interfaces/Movie";
import { RootState } from "../redux/rootReducer";

interface MovieFormValues {
    movieId?: string;
    title: string;
    description: string;
    releaseYear: number | "";
    genre: string[];
}

interface WatchlistResponse {
    status: string;
    data: {
        movie: Movie;
    };
}

interface MovieFormProps {
    purpose: "add" | "edit";
    id?: string;
}

const MovieForm: React.FC<MovieFormProps> = ({ purpose, id }) => {
    const endPoint =
        purpose === "add" ? "/watchlist/movies/add" : `/watchlist/movies/${id}`;

    const { response, error, loading, sendRequest } =
        useApiRequest<WatchlistResponse>(endPoint);

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
            toast.error(error?.response?.data?.message);
        }
    }, [response, error, navigate]);

    const handleSubmit = async (values: MovieFormValues) => {
        try {
            const method = purpose === "add" ? "POST" : "PUT";
            await sendRequest(method, values);
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Login failed. Please try again.");
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
        <div>
            <h1>{purpose === "add" ? "Add a New Movie" : "Edit Movie"}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={MovieSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" />
                            <ErrorMessage
                                name="title"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" name="description" />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <div>
                            <label htmlFor="releaseYear">Release Year</label>
                            <Field type="text" name="releaseYear" />
                            <ErrorMessage
                                name="releaseYear"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <div>
                            <label htmlFor="genre">Genre</label>
                            <Field as="select" name="genre" multiple>
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
                                className="error-message"
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MovieForm;
