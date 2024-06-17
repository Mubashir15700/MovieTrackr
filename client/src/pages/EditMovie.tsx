import MovieForm from "../components/MovieForm";
import { useParams } from "react-router-dom";

const EditMovie = () => {
    const { id } = useParams<{ id: string }>();
    return <MovieForm purpose={"edit"} id={id} />;
};

export default EditMovie;
