import "./App.css";
import "./styles/main.scss";
import useFetch from "./hooks/useFetch";
import FetchButton from "./components/FetchButton";

function App() {
    const { response, error, loading, fetchData } = useFetch<string>("http://localhost:3000/");

    return (
        <>
            <p>Movie Watchlist</p>
            {loading && <p>Loading...</p>}
            {response && <p>{response}</p>}
            {error && <p>Error: {error.message}</p>}
            <FetchButton onClick={fetchData} />
        </>
    );
}

export default App;
