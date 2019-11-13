import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { checkUser } from "../actions/registrationActions";
import { Link, Redirect } from "react-router-dom";

import "./Register.css";

class Login extends Component {
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

  login = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { checkUser } = this.props;
    const user = {
      email,
      password
    };

    checkUser(user);
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
          <form method="POST" className="resgitration-form">
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
              onClick={this.login}
            >
              SIGN IN
            </Button>
          </form>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <h3 className="register-button">Create Account</h3>
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
  checkUser: user => dispatch(checkUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
