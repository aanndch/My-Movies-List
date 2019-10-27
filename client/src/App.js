import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import "./App.css";

import store from "./store";
import history from "./history";
import Routes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import NavbarMobile from "./components/Navbar/NavbarMobile";
// import Footer from "./components/Footer";

import "react-toastify/dist/ReactToastify.css";

function App() {
  if (window.innerWidth < 500) {
    return (
      <Provider store={store}>
        <Router history={history}>
          <NavbarMobile />
          <Routes />
          {/* <Footer /> */}
        </Router>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div style={{ display: "flex", minheight: "100vh" }}>
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
}

export default App;
