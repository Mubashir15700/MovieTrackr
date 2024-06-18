import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearWatchlist } from "../redux/slices/watchlistSlice";
import CustomTooltip from "./CustomToolTip";
import ConfirmationDialog from "./ConfirmationDialog";
import { statusStringResponse } from "../interfaces/Movie";
import useApiRequest from "../hooks/useApiRequest";
import { handleApiError } from "../utils/handleApiError";
import { FaSignOutAlt, FaPlus, FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';
import styles from "./NavBar.module.scss";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const { response, error, sendRequest } =
        useApiRequest<statusStringResponse>("/auth/logout");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (response?.status === "success") {
            dispatch(logout());
            dispatch(clearWatchlist());
            navigate("/login");
        } else if (error) {
            handleApiError("Failed to logout", error);
        }
    }, [response, , error, navigate]);

    const handleLogout = async () => {
        const result = await ConfirmationDialog.confirmAction(
            "Are you sure?",
            "You will be logged out",
            "Logout",
            "#3085d6",
            "Cancel",
        );

        if (result.isConfirmed) {
            try {
                await sendRequest("GET");
            } catch (err) {
                handleApiError("Logout failed. Please try again", err);
            }
        }
    };

    return (
        <div className={styles.navBarContainer}>
            <div>
                <h1>MovieTrackr</h1>
            </div>
            <div className={styles.navLinks}>
                <Link to="/add-movie" id="addMovieIcon">
                    <button className={`${styles.addMovieLink} addMovieIcon`}>
                        <FaPlus />
                    </button>
                </Link>
                <CustomTooltip
                    id="add-movie-icon-tooltip"
                    anchorSelect=".addMovieIcon"
                    place="bottom"
                    content="Add new movie"
                />
                <button className={`${styles.logoutButton} logoutIcon`} onClick={handleLogout}>
                    <FaSignOutAlt />
                </button>
                <CustomTooltip
                    id="logout-icon-tooltip"
                    anchorSelect=".logoutIcon"
                    place="bottom"
                    content="Logout"
                />
            </div>
            <div className={styles.dropdownMenuWrapper}>
                <div className={styles.menuIcon} onClick={toggleDropdown}>
                    {isDropdownOpen ? <FaCaretSquareUp /> : <FaCaretSquareDown />}
                </div>
                {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        <Link to="/add-movie">
                            <button className={`${styles.addMovieLink} addMovieIcon`} onClick={toggleDropdown}>
                                <FaPlus />
                            </button>
                        </Link>
                        <button className={`${styles.logoutButton} logoutIcon`} onClick={handleLogout}>
                            <FaSignOutAlt />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
