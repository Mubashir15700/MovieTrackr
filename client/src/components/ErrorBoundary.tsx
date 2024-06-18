import { Component, ErrorInfo } from "react";
import { ChildComponentProps } from "../interfaces/ChildComponentProps";
import styles from "./ErrorBoundary.module.scss"

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
        console.error("Uncaught error: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className={styles.errorBoundaryContainer}>Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
