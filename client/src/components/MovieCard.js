import React from "react";
import { Card } from "@material-ui/core";

function MovieCard({ title, poster, rating }) {
  return (
    <Card className="movie-card">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
      />
      <div className="movie-rating">{rating}</div>
    </Card>
  );
}

export default MovieCard;
