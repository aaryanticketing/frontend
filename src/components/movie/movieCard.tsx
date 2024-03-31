import { useNavigate } from 'react-router-dom';
import styles from "./movieCard.module.css";

function MovieCard({
    imgUrl,
    title,
    description,
    id,
    start_date,
    end_date,
    amount
}: {
    imgUrl: string;
    title: string;
    description: string;
    id: string;
    start_date: string;
    end_date: string;
    amount: string;
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie-details/${title}`, {state:{ title, imgUrl,description, id, start_date, end_date,amount}});
    };
    return (
    <div className={styles.movie}  onClick={handleClick}>
        <div className={styles.movieTitle}>{title}</div>
        <img src={imgUrl} alt="Movie 1"/>
        <a href='movie.html'><button className={styles.selectButton}>Select</button></a>
    </div>
    );
}

export default MovieCard;
