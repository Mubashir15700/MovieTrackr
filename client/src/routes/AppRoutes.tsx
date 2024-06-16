import { useEffect } from "react";
import toast from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { RouteVariables } from "../utils/routeVariables";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import useApiRequest from "../hooks/useApiRequest";
import ProtectedRoute from "../components/ProtectedRoutes";
import AuthRoute from "../components/AuthRoutes";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import NotFound from "../pages/NotFound";

interface UserData {
    status: string;
    user: {
        email: string;
        name: string;
    };
    token: string;
}

const AppRoutes = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<UserData>("/auth/checkauth");

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("APPROUTER USEEFFECT");

        const checkauth = async () => {
            try {
                await sendRequest("GET");
            } catch (err) {
                console.error("Check authentication error:", err);
                toast.error("Check authentication failed. Please login.");
            }
        };

        checkauth();
    }, []);

    useEffect(() => {
        if (response && response.status === "success") {
            const user = {
                name: response?.user?.name,
                email: response?.user?.email,
            };
            dispatch(loginSuccess({ user }));
        }

        if (error) {
            console.log(error);
        }
    }, [response, error, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
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
