import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
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
  Person,
  Search
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { tokenLogIn } from "../../actions/registrationActions";
import Cookie from "js-cookie";
import history from "../../history";

import "./NavbarMobile.css";
import { setOpenSearch } from "../../actions/userActions";

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

  onMoviePage = () => {
    const path = window.location.pathname;
    if (path === "/" || path.slice(0, 6) === "/movie") return true;
    return false;
  };

  toggleSearchBar = open => {
    const { dispatch } = this.props;
    dispatch(setOpenSearch(open));
    this.toggleDrawer();
  };

  signOut = () => {
    Cookie.remove("token");
    window.location.href = "/";
  };

  render() {
    const { open } = this.state;
    const { token, username, openSearch } = this.props;

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
        <SwipeableDrawer
          open={open}
          onOpen={this.toggleDrawer}
          onClose={this.toggleDrawer}
        >
          <div className="navbar-container" role="presentation">
            <List component="nav">
              <NavLink
                to="/"
                exact
                onClick={() => this.toggleSearchBar(true)}
                style={{
                  textDecoration: "none"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Search className="navbar-icon" />
                  </ListItemIcon>
                  <ListItemText primary="Search" className="navbar-text" />
                </ListItem>
              </NavLink>
              <NavLink
                to="/"
                exact
                isActive={this.onMoviePage}
                onClick={this.toggleDrawer}
                style={{ textDecoration: "none" }}
                onClick={() => this.toggleSearchBar(false)}
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
            {token && (
              <Button
                type="primary"
                variant="contained"
                onClick={this.signOut}
                style={{
                  backgroundColor: "#31db91",
                  width: "100%",
                  height: "50px",
                  fontWeight: "bold"
                }}
              >
                SIGN OUT
              </Button>
            )}
          </div>
        </SwipeableDrawer>
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
