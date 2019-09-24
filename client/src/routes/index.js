import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../history";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Navbar from "../components/Navbar";

export default () => (
  <Router history={history}>
    <Navbar />
    <Route path="/" exact component={Home} />
    <Route path="/register" exact component={Register} />
    <Route path="/login" exact component={Login} />
    <Route path="/movie/:id" exact component={Movie} />
  </Router>
);
