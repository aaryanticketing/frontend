import React from "react";
import MovieCard from "../components/movie/movieCard";
import styles from "./Layout.module.css";

function OutletContainer({
}: {
    title?: string;
    children: React.ReactNode;
    isLoading?: boolean;
    breadcrumbs?: { label: string; link: string }[];
}) {
    const movies = [
        { imgUrl: 'https://via.placeholder.com/150', title: 'q' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q1' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q5' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q6' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q7' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q8' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q9' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q10' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q11' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q112' },
        { imgUrl: 'https://via.placeholder.com/150', title: 'q123' },
        // Add more movies here
      ];
    return (
        <div className={styles.container}>
            {movies.map((movie, _) => (
            <MovieCard imgUrl={movie.imgUrl} title={movie.title} />
    ))}
        </div>
    );
}

export default OutletContainer;
