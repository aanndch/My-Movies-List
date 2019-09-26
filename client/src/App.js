import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import "./App.css";

import store from "./store";
import history from "./history";
import Routes from "./routes";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      {/* <Search /> */}
      <Router history={history}>
        <div style={{ display: "flex", height: "100%" }}>
          <Navbar />
          <div className="main">
            <Routes />
          </div>
        </div>
        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;
