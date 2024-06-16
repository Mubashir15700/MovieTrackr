import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import useApiRequest from "../hooks/useApiRequest";
import { logout } from "../redux/slices/authSlice";

interface LogoutResponse {
    status: string;
}

const NavBar = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<LogoutResponse>("/auth/logout");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (response?.status === "success") {
            dispatch(logout());
            navigate("/login");
        } else if (error) {
            toast.error(error?.response?.data?.message);
        }
    }, [response, , error, navigate]);

    const handlelogout = async () => {
        try {
            await sendRequest("GET");
        } catch (err) {
            console.error("Logout error:", err);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Movie Watchlist</h1>
            <Link to="/add-movie">Add Movie</Link>
            <button onClick={handlelogout}>
                {loading ? "loading..." : ""} Logout
            </button>
        </div>
    )
}

export default NavBar;
