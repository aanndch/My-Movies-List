import React, { Component } from "react";
import { Button, Input } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import history from "../history";
import Cookie from "js-cookie";

import "./Search.css";

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  togglePopup = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  closePopup = () => {
    this.setState({ open: false });
  };

  logIn = () => {
    history.push("/login");
  };

  signOut = () => {
    Cookie.remove("token");
  };

  render() {
    const { open } = this.state;

    const token = Cookie.get("token");

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
                  onClick={this.signOut}
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
