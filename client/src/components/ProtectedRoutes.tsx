import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteVariables } from "../utils/routeVariables";
import { RootState } from "../redux/rootReducer";
import { ChildComponentProps } from "../interfaces/ChildComponentProps";

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
