import "./App.css";
import "./styles/main.scss";
// import useFetch from "./hooks/useFetch";
// import FetchButton from "./components/FetchButton";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
    // const { response, error, loading, fetchData } = useFetch<string>("http://localhost:3000/");

    return (
        <ErrorBoundary>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ErrorBoundary>
        // <>
        //     <p>Movie Watchlist</p>
        //     {loading && <p>Loading...</p>}
        //     {response && <p>{response}</p>}
        //     {error && <p>Error: {error.message}</p>}
        //     <FetchButton onClick={fetchData} />
        // </>
    );
}

export default App;
