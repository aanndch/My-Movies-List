import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { createUser } from "../actions/userActions";

import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  register = () => {
    const { email, username, password } = this.state;
    const { createUser } = this.props;
    const user = {
      email,
      username,
      password
    };

    createUser(user);
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
            name="username"
            type="text"
            placeholder="Username"
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
          <Button id="sign-up" variant="contained" onClick={this.register}>
            SIGN UP
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
