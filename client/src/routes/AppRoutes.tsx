import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { RouteVariables } from "../utils/routeVariables";
import ProtectedRoute from "../components/ProtectedRoutes";
import AuthRoute from "../components/AuthRoutes";
import Loading from "../components/Loading/Loading";
import {
    Login,
    SignUp,
    Dashboard,
    AddMovie,
    EditMovie,
    NotFound,
} from "../pages/index";
import { AuthResponse } from "../interfaces/AuthResponse";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";

const AppRoutes = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<AuthResponse>("/auth/checkauth");

    const dispatch = useDispatch();

    useEffect(() => {
        const checkauth = async () => {
            try {
                await sendRequest("GET");
            } catch (err) {
                handleApiError("Check authentication error", err);
            }
        };

        checkauth();
    }, []);

    useEffect(() => {
        if (response && response.status === "success") {
            const user = {
                userId: response?.data?.user?._id,
                name: response?.data?.user?.name,
                email: response?.data?.user?.email,
            };
            dispatch(loginSuccess({ user }));
        }

        if (error) {
            handleApiError("Checking authentication failed", error);
        }
    }, [response, error, dispatch]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route
                path={RouteVariables.Signup}
                element={
                    <AuthRoute>
                        <SignUp />
                    </AuthRoute>
                }
            />
            <Route
                path={RouteVariables.Login}
                element={
                    <AuthRoute>
                        <Login />
                    </AuthRoute>
                }
            />
            <Route
                path={RouteVariables.Dashboard}
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path={RouteVariables.AddMovie}
                element={
                    <ProtectedRoute>
                        <AddMovie />
                    </ProtectedRoute>
                }
            />
            <Route
                path={RouteVariables.EditMovie}
                element={
                    <ProtectedRoute>
                        <EditMovie />
                    </ProtectedRoute>
                }
            />
            <Route path={RouteVariables.NotFound} element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
