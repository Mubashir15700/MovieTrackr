import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";

const Dashboard = () => {
    const displayName = useSelector(
        (state: RootState) => state?.auth?.user?.name,
    );

    return (
        <div>
            <NavBar />
            <div>
                <h3>Welcome {displayName}!</h3>
                <p>
                    Discover, track, and manage your favorite movies all in one
                    place.
                </p>
                <MovieList />
            </div>
        </div>
    );
};

export default Dashboard;
