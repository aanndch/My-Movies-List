import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress
} from "@material-ui/core";

import { getMovies, getMovieDetails } from "../apiCalls";
import { toggleSelection } from "../userInteractions";
import MovieCard from "../components/MovieCard";

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "now_playing"
    };
  }

  componentDidMount = () => {
    const { category } = this.state;
    getMovies(category);
  };

  loadMovie = id => {
    getMovieDetails(id);
  };

  favorite = (id, title, poster) => {
    const { token } = this.props;
    const info = {
      movie: {
        movieId: id,
        title,
        poster
      },
      token,
      list: "favorites"
    };

    toggleSelection(id, info);
  };

  handleChange = e => {
    const { now_playing, popular, top_rated } = this.props;

    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.value === "now_playing" && now_playing.length !== 0) {
      return;
    }

    if (e.target.value === "popular" && popular.length !== 0) {
      return;
    }

    if (e.target.value === "top_rated" && top_rated.length !== 0) {
      return;
    }

    getMovies(e.target.value);
  };

  render() {
    const { category } = this.state;
    const { now_playing, popular, top_rated, loading } = this.props;

    let movies = [];
    let heading = "";
    if (category === "now_playing") {
      heading = "In Theaters";
      movies = now_playing;
    } else if (category === "popular") {
      movies = popular;
      heading = "Most Popular";
    } else {
      movies = top_rated;
      heading = "Top Rated";
    }

    if (loading) return <CircularProgress className="loader" />;

    return (
      <div className="home-container">
        <div className="heading">
          <h1 className="home-heading">{heading}</h1>
          <FormControl>
            <Select
              value={category}
              onChange={this.handleChange}
              name="category"
            >
              <MenuItem value="now_playing">In theaters</MenuItem>
              <MenuItem value="popular">Most Popular</MenuItem>
              <MenuItem value="top_rated">Top Rated</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="movie-cards">
          {movies.map(movie => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none" }}
            >
              <MovieCard
                title={movie.original_title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                onClick={() => this.loadMovie(movie.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ api, user }) => {
  return {
    now_playing: api.movies.now_playing,
    popular: api.movies.popular,
    top_rated: api.movies.top_rated,
    token: user.token,
    loading: api.loading
  };
};

export default connect(mapStateToProps)(Home);
