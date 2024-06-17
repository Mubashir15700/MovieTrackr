import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";

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
