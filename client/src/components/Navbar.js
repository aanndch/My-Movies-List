import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { Person, Videocam, FilterList, Category } from "@material-ui/icons";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "movies"
    };
  }

  activate = name => {
    this.setState({
      activeNav: name
    });
  };

  render() {
    const { activeNav } = this.state;

    return (
      <div className="navbar">
        <IconButton
          className="nav-item"
          disableFocusRipple={true}
          disableRipple={true}
          onClick={() => this.activate("movies")}
        >
          <Videocam
            style={{ color: activeNav === "movies" ? "#31db91" : "#616f7c" }}
          />
        </IconButton>
        <IconButton
          className="nav-item"
          disableFocusRipple={true}
          disableRipple={true}
          onClick={() => this.activate("category")}
        >
          <Category
            style={{ color: activeNav === "category" ? "#31db91" : "#616f7c" }}
          />
        </IconButton>
        <IconButton
          className="nav-item"
          disableFocusRipple={true}
          disableRipple={true}
          onClick={() => this.activate("filter")}
        >
          <FilterList
            style={{ color: activeNav === "filter" ? "#31db91" : "#616f7c" }}
          />
        </IconButton>
        <IconButton
          className="nav-item"
          disableFocusRipple={true}
          disableRipple={true}
          onClick={() => this.activate("profile")}
        >
          <Person
            style={{ color: activeNav === "profile" ? "#31db91" : "#616f7c" }}
          />
        </IconButton>
      </div>
    );
  }
}
