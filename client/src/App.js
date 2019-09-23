import React from "react";
import "./App.css";
import { Provider } from "react-redux";

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
