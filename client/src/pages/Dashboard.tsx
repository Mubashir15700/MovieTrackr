import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";

const Dashboard = () => {
    return (
        <div>
            <NavBar />
            <div>
                <h3>Welcome to Movie Watchlist!</h3>
                <p>Discover, track, and manage your favorite movies all in one place.</p>
                <MovieList />
            </div>
        </div>
    );
};

export default Dashboard;
