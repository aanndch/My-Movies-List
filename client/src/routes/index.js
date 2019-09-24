import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Navbar from "../components/Navbar";

export default () => (
  <BrowserRouter>
    <Navbar />
    <Route path="/" exact component={Home} />
    <Route path="/register" exact component={Register} />
    <Route path="/login" exact component={Login} />
    <Route path="/movie/:id" exact component={Movie} />
  </BrowserRouter>
);
