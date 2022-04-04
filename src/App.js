import SignUp from "./components/SignUp";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LogIn from "./components/LogIn";
import AuthContext from "./context/AuthContext";
import { Fragment, useContext, useEffect, useState } from "react";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Expenses from "./components/Expenses";
import ExpenseForm from "./components/ExpenseForm";
import YearFilter from "./components/YearFilter";
import Chart from "./components/Chart";
import Header from "./components/Header";
import ExpensesContext from "./context/ExpensesContext";
import BudgetContext from "./context/BudgetContext";
import "./css/normalize.css";
import { GlobalStyle } from "./css/globalStyles";
import styled from "styled-components";

const AddExpDiv = styled.div`
  display: flex;
  align-items: center;
  min-width: 70%;
  .add-exp-btn {
    width: 70%;
    margin: 2em auto 1em auto;
    border-radius: 5px;
    background-color: #b58ef2;
    border: 1px solid #b58ef2;
    color: black;
    min-height: 46px;
  }
  .add-exp-btn:hover {
    cursor: pointer;
    background-color: #9665e3;
  }
  @media (min-width: 768px) {
    .add-exp-btn {
      width: 30%;
    }
  }
`;

function App() {
  const authCtx = useContext(AuthContext);
  const expCtx = useContext(ExpensesContext);
  const budgCtx = useContext(BudgetContext);
  const [category, setCategory] = useState("Choose Categoory");

  const [selectedYear, setYear] = useState(2022);
  const [isEditingForm, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token) {
      expCtx.getExp(userId, token);
      budgCtx.getBudget(userId, token);
    }
  }, [token]);

  const isEditingFormHandler = () => {
    setIsEditing(true);
  };

  const stopIsEditingFormHandler = () => {
    setIsEditing(false);
  };

  const submitExpenseHandler = async (data, token) => {
    setLoading(true);
    expCtx.storeNewExp(authCtx.userId, data, authCtx.token);

    setLoading(false);
    setIsEditing(false);
  };

  const filteredExpenses = expCtx.expenses.filter((expense) => {
    return expense.year === selectedYear;
  });

  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Layout />
            ) : (
              <Navigate to="/sign-up" state={{ from: location }} replace />
            )
          }
        >
          <Route path="account" element={<Account />} />

          <Route
            path=""
            element={
              <Fragment>
                <Header />
                <YearFilter onChangeYear={setYear} />
                <Chart expenses={filteredExpenses} />
                {!isEditingForm ? (
                  <AddExpDiv>
                    <button
                      className="add-exp-btn"
                      onClick={isEditingFormHandler}
                    >
                      Add New Expense
                    </button>
                  </AddExpDiv>
                ) : (
                  <ExpenseForm
                    onSubmitNewExpense={submitExpenseHandler}
                    onCancel={stopIsEditingFormHandler}
                  />
                )}
                <Expenses expenses={filteredExpenses} />
              </Fragment>
            }
          />
        </Route>
        <Route path="*" element={<SignUp />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
