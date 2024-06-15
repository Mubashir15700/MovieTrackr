import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Watchlist from "../pages/Watchlist";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Watchlist />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
