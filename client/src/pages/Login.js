import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { checkUser } from "../actions/userActions";

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

  login = () => {
    const { email, password } = this.state;
    const { checkUser } = this.props;
    const user = {
      email,
      password
    };

    checkUser(user);
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

const mapDispatchToProps = dispatch => ({
  checkUser: user => dispatch(checkUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
