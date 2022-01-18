import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
