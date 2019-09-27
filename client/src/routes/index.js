import React from "react";
import { Route } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Discover from "../pages/Discover";

export default () => (
  <>
    <Route path="/" exact component={Home} />
    <Route path="/register" exact component={Register} />
    <Route path="/login" exact component={Login} />
    <Route path="/movie/:id" exact component={Movie} />
    <Route path="/discover" exact component={Discover} />
  </>
);
