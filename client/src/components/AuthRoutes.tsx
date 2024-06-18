import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { ChildComponentProps } from "../interfaces/ChildComponentProps";
import { RouteVariables } from "../utils/routeVariables";

const AuthRoute: React.FC<ChildComponentProps> = ({ children }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    if (isAuthenticated) {
        return <Navigate to={RouteVariables.Dashboard} />;
    } else {
        return <>{children}</>;
    }
};

export default AuthRoute;
