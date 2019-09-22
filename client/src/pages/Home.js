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
  Typography
} from "@material-ui/core";
import { getNowPlaying } from "../apiCalls";
import { logoutUser } from "../actions/userActions";

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

  render() {
    const { nowPlaying } = this.props;

    const token = Cookie.get("token");
    if (!token) {
      return <h1>ACCESS DENIED</h1>;
    }

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
