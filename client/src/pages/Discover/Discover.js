import React, { Component } from "react";
import { connect } from "react-redux";

import { setFilters } from "../../actions/userActions";
import { getMoviesByGenres } from "../../apiCalls";

import DiscoverMobile from "./DiscoverMobile";
import DiscoverDesktop from "./DiscoverDesktop";

class Discover extends Component {
  componentDidMount() {
    const { genres } = this.props;
    getMoviesByGenres(genres.join(","));
  }

  handleGenreSelect = e => {
    let { genres, dispatch } = this.props;

    const selectedGenre = parseInt(e.target.value);

    if (genres.includes(selectedGenre)) {
      genres = genres.filter(genre => genre !== selectedGenre);
    } else {
      genres = [...genres, parseInt(selectedGenre)];
    }

    dispatch(setFilters(genres));

    // this.setState({
    //   genres
    // });

    // this.setState(prevState => ({
    //   genres: [...prevState.genres, parseInt(e.target.value)]
    // }));
  };

  getMovies = () => {
    let { genres } = this.props;
    getMoviesByGenres(genres.join(","));
  };

  render() {
    const { genres, isLoading } = this.props;
    const { filteredMovies } = this.props;

    if (window.innerWidth < 500) {
      return (
        <DiscoverMobile
          genres={genres}
          isLoading={isLoading}
          filteredMovies={filteredMovies}
          handleGenreSelect={this.handleGenreSelect}
          getMovies={this.getMovies}
        />
      );
    } else {
      return (
        <DiscoverDesktop
          genres={genres}
          isLoading={isLoading}
          filteredMovies={filteredMovies}
          handleGenreSelect={this.handleGenreSelect}
          getMovies={this.getMovies}
        />
      );
    }
  }
}

const mapStatetoProps = ({ api, user, loading }) => ({
  filteredMovies: api.filteredMovies,
  genres: user.filters,
  isLoading: loading.isLoading
});

export default connect(mapStatetoProps)(Discover);
