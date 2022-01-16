import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
render(
  //<AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  //</AuthContextProvider>,
  rootElement
);
