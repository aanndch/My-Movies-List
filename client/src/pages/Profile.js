import React, { Component } from "react";
import { getSearchedUserInfo } from "../userInteractions";

export default class Profile extends Component {
  componentDidMount = () => {
    const { username } = this.props.match.params;
    getSearchedUserInfo(username);
  };

  render() {
    return (
      <div>
        <h1>PROFILE</h1>
      </div>
    );
  }
}
