import { useParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";

const EditMovie = () => {
    const { id } = useParams<{ id: string }>();
    return <MovieForm purpose={"edit"} id={id} />;
};

export default EditMovie;
