import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/main.scss";

function App() {
    return (
        <ErrorBoundary>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
