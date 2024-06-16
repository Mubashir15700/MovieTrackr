import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteVariables } from "../utils/routeVariables";
import { RootState } from "../redux/rootReducer";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    if (isAuthenticated) {
        return <>{children}</>;
    } else {
        return <Navigate to={RouteVariables.Login} />;
    }
};

export default ProtectedRoute;
