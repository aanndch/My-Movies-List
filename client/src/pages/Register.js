import React, { Component } from "react";
import { Button } from "@material-ui/core";

import "./Register.css";

export default class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="registration">
          <input type="email" placeholder="Email" min={6} required />
          <input type="text" placeholder="Username" min={6} required />
          <input type="password" placeholder="Password" min={6} required />
          <Button id="sign-up" variant="contained">
            SIGN UP
          </Button>
        </div>
      </div>
    );
  }
}
