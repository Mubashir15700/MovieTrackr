import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../../utils/validations/signUpSchema";
import { AuthResponse } from "../../interfaces/AuthResponse";
import useApiRequest from "../../hooks/useApiRequest";
import { handleApiError } from "../../utils/handleApiError";
import styles from "./SignUp.module.scss";

const SignUp = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<AuthResponse>("/auth/signup");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (response?.status === "success") {
            const user = {
                userId: response?.data?.user?._id,
                name: response?.data?.user?.name,
                email: response?.data?.user?.email,
            };

            dispatch(loginSuccess({ user }));
            navigate("/");
        } else if (error) {
            handleApiError("Signup error", error);
        }
    }, [response, error, navigate]);

    const handleSubmit = async (values: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        try {
            await sendRequest("POST", values);
        } catch (err) {
            handleApiError("Signup error", err);
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <div className={styles.formContainer}>
                        <h1>Sign Up</h1>
                        <Form className={styles.signupForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    className={styles.input}
                                />
                                <ErrorMessage
                                    className={styles.errorMessage}
                                    name="name"
                                    component="div"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                />
                                <ErrorMessage
                                    className={styles.errorMessage}
                                    name="email"
                                    component="div"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="password"
                                    className={styles.label}
                                >
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={styles.input}
                                />
                                <ErrorMessage
                                    className={styles.errorMessage}
                                    name="password"
                                    component="div"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="confirmPassword"
                                    className={styles.label}
                                >
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className={styles.input}
                                />
                                <ErrorMessage
                                    className={styles.errorMessage}
                                    name="confirmPassword"
                                    component="div"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitButton}
                            >
                                {loading ? "Signing up..." : "Signup"}
                            </button>
                            <p>
                                Already have an acount?
                                <Link to={"/login"}>Login</Link>
                            </p>
                            {error && (
                                <div className={styles.globalErrorMessage}>
                                    {error.message}
                                </div>
                            )}
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
