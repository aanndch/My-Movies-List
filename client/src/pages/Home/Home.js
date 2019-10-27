import React, { Component } from "react";
import { connect } from "react-redux";
import HomeMobile from "./HomeMobile";
import HomeDesktop from "./HomeDesktop";

import { getMovies, getMovieDetails, searchForMovie } from "../../apiCalls";
import { toggleSelection } from "../../userInteractions";
import { setOpenSearch } from "../../actions/userActions";

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
      loadSearch,
      openSearch,
      isLoading
    } = this.props;

    if (window.innerWidth < 500) {
      return (
        <HomeMobile
          category={category}
          value={value}
          now_playing={now_playing}
          popular={popular}
          top_rated={top_rated}
          search={search}
          loadSearch={loadSearch}
          openSearch={openSearch}
          isLoading={isLoading}
          handleSearchChange={this.handleSearchChange}
          handleChange={this.handleChange}
          searchMovie={this.searchMovie}
          favorite={this.favorite}
          closeSearch={this.closeSearch}
          loadMovie={this.loadMovie}
        />
      );
    } else {
      return (
        <HomeDesktop
          category={category}
          value={value}
          now_playing={now_playing}
          popular={popular}
          top_rated={top_rated}
          search={search}
          loadSearch={loadSearch}
          openSearch={openSearch}
          isLoading={isLoading}
          handleSearchChange={this.handleSearchChange}
          handleChange={this.handleChange}
          searchMovie={this.searchMovie}
          favorite={this.favorite}
          closeSearch={this.closeSearch}
          loadMovie={this.loadMovie}
        />
      );
    }
  }
}

const mapStateToProps = ({ api, user, loading }) => {
  return {
    now_playing: api.movies.now_playing,
    popular: api.movies.popular,
    top_rated: api.movies.top_rated,
    search: api.movies.search,
    token: user.token,
    loadSearch: api.loadSearch,
    openSearch: user.openSearch,
    isLoading: loading.isLoading
  };
};

export default connect(mapStateToProps)(Home);
