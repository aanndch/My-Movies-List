import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Person, Videocam, FilterList, Category } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { tokenLogIn } from "../actions/registrationActions";
import Store from "../store";
import Cookie from "js-cookie";

import "./Navbar.css";

class Navbar extends Component {
  componentDidMount = () => {
    const token = Cookie.get("token");
    if (token) Store.dispatch(tokenLogIn({ token }));
  };

  register = () => {
    const path = window.location.pathname;
    if (path === "/login" || path === "/register") return true;
    return false;
  };

  render() {
    const { token } = this.props;

    return (
      <div className="navbar">
        <NavLink to="/" exact style={{ color: "#616f7c" }}>
          <IconButton
            className="nav-item"
            disableFocusRipple={true}
            disableRipple={true}
          >
            <Videocam />
          </IconButton>
        </NavLink>
        <NavLink to="/genres" style={{ color: "#616f7c" }}>
          <IconButton
            className="nav-item"
            disableFocusRipple={true}
            disableRipple={true}
          >
            <Category />
          </IconButton>
        </NavLink>
        <NavLink to="/discover" style={{ color: "#616f7c" }}>
          <IconButton
            className="nav-item"
            disableFocusRipple={true}
            disableRipple={true}
          >
            <FilterList />
          </IconButton>
        </NavLink>
        {token ? (
          <NavLink to="/profile" style={{ color: "#616f7c" }}>
            <IconButton
              className="nav-item"
              disableFocusRipple={true}
              disableRipple={true}
            >
              <Person />
            </IconButton>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            isActive={this.register}
            style={{ color: "#616f7c" }}
          >
            <IconButton
              className="nav-item"
              disableFocusRipple={true}
              disableRipple={true}
            >
              <Person />
            </IconButton>
          </NavLink>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  token: user.token
});

export default connect(mapStateToProps)(Navbar);
