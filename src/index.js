import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ExpensesContextProvider>
          <App />
        </ExpensesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
