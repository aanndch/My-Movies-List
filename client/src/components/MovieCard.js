import React from "react";
import { Card } from "@material-ui/core";

const MovieCard = ({ title, poster, rating }) => (
  <Card className="movie-card profile-movie">
    <img
      className="movie-image"
      src={`https://image.tmdb.org/t/p/w500${poster}`}
      alt={title}
    />
    {rating && <div className="movie-rating">{rating}</div>}
  </Card>
);

export default MovieCard;
