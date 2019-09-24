import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { createUser } from "../actions/registrationActions";
import { Redirect } from "react-router-dom";

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

    return (
      <div className="container">
        <div className="movies-image-part">
          <img
            src="https://babbletop.com/wp-content/uploads/2018/05/years-for-movies.jpg"
            alt="movies-background"
            className="movies-image"
          />
          <div className="registration">
            <form type="POST">
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
              <Button
                id="sign-up"
                variant="contained"
                type="submit"
                onClick={this.register}
              >
                SIGN UP
              </Button>
            </form>
          </div>
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
