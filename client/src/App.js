import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import "./App.css";

import store from "./store";
import history from "./history";
import Routes from "./routes";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {
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

export default App;
