import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MovieSchema } from "../utils/validations/movieSchema";

interface MovieFormValues {
    title: string;
    description: string;
    releaseYear: string;
    genre: string[];
}

const MovieForm: React.FC = () => {
    const initialValues: MovieFormValues = {
        title: "",
        description: "",
        releaseYear: "",
        genre: [],
    };

    const handleSubmit = async (values: MovieFormValues) => {
        console.log(values);
    };

    return (
        <div>
            <h1>Add a New Movie</h1>
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
                            {isSubmitting ? "Adding..." : "Add Movie"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MovieForm;
