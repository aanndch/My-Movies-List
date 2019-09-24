import React from "react";
import { Provider } from "react-redux";

import "./App.css";

import store from "./store";
import Routes from "./routes";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <Search />
      <div style={{ display: "flex" }}>
        <Routes />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
