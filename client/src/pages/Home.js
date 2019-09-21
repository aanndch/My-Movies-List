import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getNowPlaying } from "../apiCalls";

import "./Home.css";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  render() {
    const { nowPlaying } = this.props;

    return (
      <div className="container">
        <div className="now-playing">
          {nowPlaying.map(movie => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card className="movie-card">
                <CardActionArea className="movie-card-inner">
                  <CardMedia
                    className="movie-image"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title="Poster"
                  />
                  <CardContent className="movie-card-bottom">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="movie-link"
                    >
                      {movie.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return {
    nowPlaying: api.nowPlaying
  };
};

export default connect(mapStateToProps)(Home);
