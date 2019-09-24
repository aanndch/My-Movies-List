import React, { Component } from "react";
import { Input } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import "./Search.css";

export default class SearchHeader extends Component {
  render() {
    return (
      <div className="search-container">
        <div className="logo-part">
          <h1 className="logo">MML</h1>
        </div>
        <div className="search-part">
          <Search className="search-icon" />
          <Input
            className="search-input"
            disableUnderline={true}
            placeholder="Search for a movie"
          />
        </div>
        <div className="picture-part">
          <img
            className="profile-pic"
            src="https://www.instituteofphotography.in/wp-content/uploads/2015/05/dummy-profile-pic.jpg"
            alt="Picture"
            height={50}
            width={50}
          />
        </div>
      </div>
    );
  }
}
