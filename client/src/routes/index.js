import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import Movie from "../pages/Movie";

export default () => (
  <BrowserRouter>
    <Route path="/" exact component={Home} />
    <Route path="/movie/:id" exact component={Movie} />
  </BrowserRouter>
);
