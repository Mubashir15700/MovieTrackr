import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../utils/validations/signUpSchema";
import { AuthResponse } from "../interfaces/AuthResponse";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";

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
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <Field type="password" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {loading ? "Loading..." : ""} Signup
                    </button>
                    {error && (
                        <div className="error-message">{error.message}</div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default SignUp;
