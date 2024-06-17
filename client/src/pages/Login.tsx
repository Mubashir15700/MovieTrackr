import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../utils/validations/loginSchema";
import { loginSuccess } from "../redux/slices/authSlice";
import useApiRequest from "../hooks/useApiRequest";

interface UserData {
    status: string;
    data: {
        user: {
            _id: string;
            email: string;
            name: string;
        };
        token: string;
    };
}

const Login = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<UserData>("/auth/login");

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
            toast.error(error?.response?.data?.message);
        }
    }, [response, , error, navigate]);

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            await sendRequest("POST", values);
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
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
                    <button type="submit" disabled={isSubmitting}>
                        {loading ? "Loading..." : ""} Login
                    </button>
                    {error && (
                        <div className="error-message">{error.message}</div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default Login;
