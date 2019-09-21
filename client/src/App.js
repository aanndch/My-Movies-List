import React from "react";
import "./App.css";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes />
      <Footer />
    </Provider>
  );
}

export default App;
