import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import {
  Person,
  Videocam,
  FilterList,
  Search,
  ExitToAppRounded
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { setOpenSearch } from "../../actions/userActions";
import { tokenLogIn } from "../../actions/registrationActions";
import Cookie from "js-cookie";

import "./Navbar.css";

class Navbar extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    const token = Cookie.get("token");
    if (token) dispatch(tokenLogIn({ token }));
  };

  register = () => {
    const path = window.location.pathname;
    if (path === "/login" || path === "/register") return true;
    return false;
  };

  onMoviePage = () => {
    const path = window.location.pathname;
    if (path === "/" || path.slice(0, 6) === "/movie") return true;
    return false;
  };

  toggleSearchBar = open => {
    const { dispatch } = this.props;

    dispatch(setOpenSearch(open));
  };

  logOut = () => {
    Cookie.remove("token");
    window.location.href = "/";
  };

  render() {
    const { token, openSearch, username } = this.props;

    return (
      <nav>
        <div className="navbar">
          <NavLink
            to="/"
            exact
            style={{ color: "#616f7c" }}
            onClick={() => this.toggleSearchBar(true)}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="Search"
              placement="right"
            >
              <IconButton
                className="nav-item"
                disableFocusRipple={true}
                disableRipple={true}
              >
                <Search style={{ color: openSearch ? "#31db91" : "#616f7c" }} />
              </IconButton>
            </Tooltip>
          </NavLink>
          <div className="middle-nav">
            <NavLink
              to="/"
              isActive={this.onMoviePage}
              exact
              style={{ color: "#616f7c" }}
              onClick={() => this.toggleSearchBar(false)}
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Movies"
                placement="right"
              >
                <IconButton
                  className="nav-item"
                  disableFocusRipple={true}
                  disableRipple={true}
                >
                  <Videocam />
                </IconButton>
              </Tooltip>
            </NavLink>
            <NavLink
              to="/discover"
              style={{ color: "#616f7c" }}
              onClick={() => this.toggleSearchBar(false)}
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Discover"
                placement="right"
              >
                <IconButton
                  className="nav-item"
                  disableFocusRipple={true}
                  disableRipple={true}
                >
                  <FilterList />
                </IconButton>
              </Tooltip>
            </NavLink>
            {token ? (
              <NavLink
                to={`/profile/${username}`}
                style={{ color: "#616f7c" }}
                onClick={() => this.toggleSearchBar(false)}
              >
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Profile"
                  placement="right"
                >
                  <IconButton
                    className="nav-item"
                    disableFocusRipple={true}
                    disableRipple={true}
                  >
                    <Person />
                  </IconButton>
                </Tooltip>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                isActive={this.register}
                style={{ color: "#616f7c" }}
                onClick={() => this.toggleSearchBar(false)}
              >
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Login"
                  placement="right"
                >
                  <IconButton
                    className="nav-item"
                    disableFocusRipple={true}
                    disableRipple={true}
                  >
                    <Person />
                  </IconButton>
                </Tooltip>
              </NavLink>
            )}
          </div>
          {token && (
            <div className="sign-out-part">
              <Tooltip
                TransitionComponent={Zoom}
                title="Log Out"
                placement="right"
              >
                <IconButton
                  className="nav-item"
                  disableFocusRipple={true}
                  disableRipple={true}
                  onClick={() => this.logOut()}
                  style={{ color: "rgb(97, 111, 124)" }}
                >
                  <ExitToAppRounded />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
  username: user.username,
  openSearch: user.openSearch
});

export default connect(mapStateToProps)(Navbar);
