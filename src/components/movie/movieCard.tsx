import styles from "./movieCard.module.css";

function MovieCard({
    imgUrl,
    title,
}: {
    imgUrl: string;
    title: string;
}) {
    return (
    <div className={styles.movie}>
        <div className={styles.movieTitle}>{title}</div>
        <img src={imgUrl} alt="Movie 1"/>
        <a href='movie.html'><button className={styles.selectButton}>Select</button></a>
    </div>
    );
}

export default MovieCard;
