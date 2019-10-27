import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  Menu,
  AccountCircle,
  FilterList,
  Videocam,
  Person
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { tokenLogIn } from "../actions/registrationActions";
import Cookie from "js-cookie";

import "./NavbarMobile.css";

class NavbarMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const token = Cookie.get("token");
    if (token) dispatch(tokenLogIn({ token }));
  };

  toggleDrawer = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  register = () => {
    const path = window.location.pathname;
    if (path === "/login" || path === "/register") return true;
    return false;
  };

  render() {
    const { open } = this.state;
    const { token, username } = this.props;

    return (
      <div className="navbar-mobile">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.toggleDrawer}
            >
              <Menu />
            </IconButton>
            <AccountCircle />
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={this.toggleDrawer}>
          <div className="navbar-container" role="presentation">
            <List component="nav" aria-label="main mailbox folders">
              <NavLink
                to="/"
                exact
                onClick={this.toggleDrawer}
                style={{ textDecoration: "none" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Videocam className="navbar-icon" />
                  </ListItemIcon>
                  <ListItemText primary="Movies" className="navbar-text" />
                </ListItem>
              </NavLink>
              <NavLink
                to="/discover"
                exact
                onClick={this.toggleDrawer}
                style={{ textDecoration: "none" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <FilterList className="navbar-icon" />
                  </ListItemIcon>
                  <ListItemText primary="Discover" className="navbar-text" />
                </ListItem>
              </NavLink>
              {token ? (
                <NavLink
                  to={`/profile/${username}`}
                  onClick={this.toggleDrawer}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Person className="navbar-icon" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" className="navbar-text" />
                  </ListItem>
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  isActive={this.register}
                  onClick={this.toggleDrawer}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Person className="navbar-icon" />
                    </ListItemIcon>
                    <ListItemText primary="Login" className="navbar-text" />
                  </ListItem>
                </NavLink>
              )}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
  username: user.username,
  openSearch: user.openSearch
});

export default connect(mapStateToProps)(NavbarMobile);
