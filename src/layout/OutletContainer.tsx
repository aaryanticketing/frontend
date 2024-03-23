import React from "react";
import MovieCard from "../components/movie/movieCard";

function OutletContainer({
}: {
    title?: string;
    children: React.ReactNode;
    isLoading?: boolean;
    breadcrumbs?: { label: string; link: string }[];
}) {
    return (
        <MovieCard imgUrl="https://via.placeholder.com/150" title="Movie 1" />
    );
}

export default OutletContainer;
