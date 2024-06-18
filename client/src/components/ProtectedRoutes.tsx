import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { ChildComponentProps } from "../interfaces/ChildComponentProps";
import { RouteVariables } from "../utils/routeVariables";

const ProtectedRoute: React.FC<ChildComponentProps> = ({ children }) => {
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
