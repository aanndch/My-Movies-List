import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { Person, Videocam, FilterList, Category } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

export default class Navbar extends Component {
  register = () => {
    const path = window.location.pathname;
    if (path === "/login" || path === "/register") return true;
    return false;
  };

  render() {
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
      </div>
    );
  }
}
