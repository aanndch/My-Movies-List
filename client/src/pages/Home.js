import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import { getNowPlaying } from "../apiCalls";

import "./Home.css";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  render() {
    const { nowPlaying } = this.props;

    return (
      <div>
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
                  {/* <CardContent className="movie-card-bottom">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="movie-link"
                    >
                      {movie.title}
                    </Typography>
                  </CardContent> */}
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          // onClick={}
        >
          LOG OUT
        </Button>
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
