import React from "react";
import { Provider } from "react-redux";

import "./App.css";

import store from "./store";
import Routes from "./routes";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <Search />
      <div style={{ display: "flex" }}>
        <Navbar />
        <Routes />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
