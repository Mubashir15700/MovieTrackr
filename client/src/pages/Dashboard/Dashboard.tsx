import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import NavBar from "../../components/NavBar/NavBar";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    const displayName = useSelector(
        (state: RootState) => state?.auth?.user?.name,
    );

    return (
        <div>
            <NavBar />
            <div className={styles.contentsSection}>
                <div className={styles.welcomeSection}>
                    <h3>Welcome, {displayName}!</h3>
                    <p>
                        Discover, track, and manage your favorite movies all in
                        one place.
                    </p>
                </div>
                <MovieList />
            </div>
        </div>
    );
};

export default Dashboard;
