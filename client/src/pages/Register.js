import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { createUser } from "../actions/registrationActions";
import { Redirect, Link } from "react-router-dom";

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

  register = e => {
    e.preventDefault();
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
    const { token } = this.props;
    if (token) return <Redirect to="/" />;

    const inputStyle =
      window.innerWidth < 769
        ? {
            width: "80%",
            padding: "1rem"
          }
        : {
            width: "100%"
          };

    return (
      <div className="container">
        <div className="registration">
          <form type="POST">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
              min={6}
              style={inputStyle}
              required
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
              min={6}
              style={inputStyle}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              min={6}
              style={inputStyle}
              required
            />
            <Button
              id="sign-up"
              variant="contained"
              type="submit"
              style={inputStyle}
              onClick={this.register}
            >
              SIGN UP
            </Button>
          </form>
          <Link
            to="/login"
            style={{ textDecoration: "none", width: "80%", margin: "0 auto" }}
          >
            <h3 className="register-button">Already have an account</h3>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  token: user.token
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
