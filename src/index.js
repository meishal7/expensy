import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";
import { BudgetContextProvider } from "./context/BudgetContext";
import { CredentialsContextProvider } from "./context/CredentialsContext";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <BudgetContextProvider>
          <ExpensesContextProvider>
            <CredentialsContextProvider>
              <App />
            </CredentialsContextProvider>
          </ExpensesContextProvider>
        </BudgetContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
