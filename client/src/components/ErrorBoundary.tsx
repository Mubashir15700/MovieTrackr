import { Component, ErrorInfo } from "react";
import { ChildComponentProps } from "../interfaces/ChildComponentProps";

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<ChildComponentProps, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
