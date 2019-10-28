import React, { Component } from "react";
import { connect } from "react-redux";

import { setFilters } from "../../actions/userActions";
import { getMoviesByGenres, getMoreMovies } from "../../apiCalls";

import DiscoverMobile from "./DiscoverMobile";
import DiscoverDesktop from "./DiscoverDesktop";

let page = 1;

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

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

  toggleDrawer = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  getMovies = () => {
    let { genres } = this.props;
    this.toggleDrawer();
    getMoviesByGenres(genres.join(","));
  };

  getMore = () => {
    let { genres } = this.props;
    page = page + 1;

    getMoreMovies(genres.join(","), page);
  };

  render() {
    const { open } = this.state;
    const { genres, isLoading, filteredMovies, hasMore } = this.props;

    if (window.innerWidth < 769) {
      return (
        <DiscoverMobile
          genres={genres}
          isLoading={isLoading}
          filteredMovies={filteredMovies}
          handleGenreSelect={this.handleGenreSelect}
          getMovies={this.getMovies}
          open={open}
          toggleDrawer={this.toggleDrawer}
          getMore={this.getMore}
          hasMore={hasMore}
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
          getMore={this.getMore}
          hasMore={hasMore}
        />
      );
    }
  }
}

const mapStatetoProps = ({ api, user, loading }) => ({
  filteredMovies: api.filteredMovies,
  genres: user.filters,
  isLoading: loading.isLoading,
  hasMore: api.hasMore
});

export default connect(mapStatetoProps)(Discover);
