import {
    Box,
    Breadcrumbs,
    Container,
    LinearProgress,
    Link as MUILink,
    Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/movie/movieCard";

function OutletContainer({
    title,
    children,
    isLoading = false,
    breadcrumbs = [],
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
