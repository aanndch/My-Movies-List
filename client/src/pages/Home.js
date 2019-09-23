import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Fab
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { getNowPlaying } from "../apiCalls";
import { toggleFavorite } from "../userInteractions";
import { logoutUser } from "../actions/registrationActions";

import "./Home.css";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  logout = () => {
    const { logoutUser } = this.props;
    Cookie.remove("token");
    logoutUser();
    window.location.reload(false);
  };

  favorite = (id, title, poster) => {
    const token = Cookie.get("token");
    const info = {
      movie: {
        movieId: id,
        title,
        poster
      },
      token,
      list: "favorites"
    };

    toggleFavorite(id, info);
  };

  render() {
    const { nowPlaying } = this.props;

    return (
      <div>
        <div className="now-playing">
          {nowPlaying.map(movie => (
            <Card key={movie.id} className="movie-card">
              <CardActionArea className="movie-card-inner">
                <Fab
                  color="secondary"
                  size="small"
                  aria-label="favorite"
                  className="favorite-button"
                  onClick={() =>
                    this.favorite(
                      movie.id,
                      movie.original_title,
                      movie.poster_path
                    )
                  }
                >
                  <Favorite style={{ color: "#333" }} />
                </Fab>
                <Link to={`/movie/${movie.id}`}>
                  <CardMedia
                    className="movie-image"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title={movie.original_title}
                  />
                </Link>
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
          ))}
        </div>
        <Button variant="contained" color="primary" onClick={this.logout}>
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

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
