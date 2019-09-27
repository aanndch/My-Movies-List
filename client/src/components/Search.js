import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { logoutUser, tokenLogIn } from "../actions/registrationActions";
import Cookie from "js-cookie";
import history from "../history";
import { searchForMovie } from "../apiCalls";

import "./Search.css";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: ""
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const token = Cookie.get("token");
    if (token) dispatch(tokenLogIn({ token }));
  };

  togglePopup = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  closePopup = () => {
    this.setState({ open: false });
  };

  logIn = () => {
    history.push("/login");
  };

  logOut = () => {
    const { logoutUser } = this.props;
    Cookie.remove("token");
    logoutUser();
  };

  handleSearchChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  searchMovie = e => {
    e.preventDefault();
    const { search } = this.state;

    searchForMovie(search);
  };

  render() {
    const { open, search } = this.state;
    const { token } = this.props;

    return (
      <div className="search-container">
        <div className="logo-part">
          <h1 className="logo">MML</h1>
        </div>
        <div className="search-part">
          <form type="GET" onSubmit={this.searchMovie}>
            <Search className="search-icon" />
            <Input
              className="search-input"
              disableUnderline={true}
              placeholder="Search for a movie"
              value={search}
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
          </form>
        </div>
        <div className="picture-part" onMouseLeave={this.closePopup}>
          {token ? (
            <>
              <img
                className="profile-pic"
                src="https://www.instituteofphotography.in/wp-content/uploads/2015/05/dummy-profile-pic.jpg"
                alt="profile-pic"
                height={50}
                width={50}
                onClick={this.togglePopup}
              />
              <div
                className="popup"
                style={{
                  display: open ? "flex" : "none"
                }}
              >
                <div className="arrow"></div>
                <Button
                  variant="contained"
                  className="sign-out"
                  onClick={this.logOut}
                >
                  SIGN OUT
                </Button>
              </div>
            </>
          ) : (
            <Button
              size="large"
              variant="contained"
              className="log-in"
              onClick={this.logIn}
            >
              LOG IN
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ api, user }) => {
  return {
    nowPlaying: api.nowPlaying,
    token: user.token
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
)(SearchHeader);
