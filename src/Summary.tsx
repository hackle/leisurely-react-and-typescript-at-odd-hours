import React from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { RouteParam } from "./App";

export const Summary = () => {

    const { term } = useParams<RouteParam>();

    return <>
        <p>You searched for <b>{term}</b> </p>
        <Link to="/search">Search for something else </Link>
    </>;
}