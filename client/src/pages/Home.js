import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Input
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { getMovies, getMovieDetails, searchForMovie } from "../apiCalls";
import { toggleSelection } from "../userInteractions";
import MovieCard from "../components/MovieCard";

import "./Home.css";
import { setOpenSearch } from "../actions/userActions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "now_playing",
      value: ""
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

  handleSearchChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  searchMovie = e => {
    e.preventDefault();
    const { value } = this.state;

    searchForMovie(value);
  };

  closeSearch = () => {
    const { dispatch } = this.props;

    dispatch(setOpenSearch(false));
  };

  render() {
    const { category, value } = this.state;
    const {
      now_playing,
      popular,
      top_rated,
      search,
      loading,
      loadSearch,
      openSearch
    } = this.props;

    if (loading) return <CircularProgress className="loader" />;

    let movies = [];
    let heading = "";
    if (category === "now_playing") {
      heading = "In Theaters";
      movies = now_playing;
    } else if (category === "popular") {
      heading = "Most Popular";
      movies = popular;
    } else {
      heading = "Top Rated";
      movies = top_rated;
    }

    if (loadSearch) {
      heading = "Search Results";
      movies = search;
    }

    return (
      <div className="home-container">
        <div className="heading search-part">
          {openSearch ? (
            <form type="GET" onSubmit={this.searchMovie}>
              <Search className="search-icon" />
              <Input
                className="search-input"
                disableUnderline={true}
                placeholder="Search for a movie"
                value={value}
                onChange={this.handleSearchChange}
              />
              <input
                type="submit"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px"
                }}
                tabIndex="-1"
              />
              <p onClick={this.closeSearch}>+</p>
            </form>
          ) : (
            <>
              <h1 className="home-heading">{heading}</h1>
              {/* {!loadSearch && ( */}
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
              {/* )} */}
            </>
          )}
        </div>
        <div className="movie-cards">
          {movies.map(movie => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none", margin: "0.8rem" }}
            >
              <MovieCard
                title={movie.title}
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
    search: api.movies.search,
    token: user.token,
    loadSearch: api.loadSearch,
    loading: api.loading,
    openSearch: user.openSearch
  };
};

export default connect(mapStateToProps)(Home);
