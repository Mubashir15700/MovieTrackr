import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteVariables } from "../utils/routeVariables";
import { RootState } from "../redux/rootReducer";
import { ChildComponentProps } from "../interfaces/ChildComponentProps";

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
