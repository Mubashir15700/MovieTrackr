import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../utils/validations/loginSchema";
import { AuthResponse } from "../../interfaces/AuthResponse";
import useApiRequest from "../../hooks/useApiRequest";
import { handleApiError } from "../../utils/handleApiError";
import styles from "./Login.module.scss";

const Login = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<AuthResponse>("/auth/login");

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
            handleApiError("Login error", error);
        }
    }, [response, error, navigate]);

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            await sendRequest("POST", values);
        } catch (err) {
            handleApiError("Login error", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <div className={styles.formContainer}>
                        <h1>Log in</h1>
                        <Form className={styles.loginForm}>
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
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitButton}
                            >
                                {loading ? "Loging in..." : "Login"}
                            </button>
                            <p>
                                Don't have an acount?
                                <Link to={"/signup"}>Signup</Link>
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

export default Login;
