import React, { Component } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./Register.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  login = () => {
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    axios
      .post("http://localhost:5000/api/user/login", user)
      // TODO Make notification of success
      .then(({ data }) => console.log(data));
  };

  render() {
    return (
      <div className="container">
        <div className="registration">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleChange}
            min={6}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            min={6}
            required
          />
          <Button id="sign-up" variant="contained" onClick={this.login}>
            SIGN IN
          </Button>
        </div>
      </div>
    );
  }
}
