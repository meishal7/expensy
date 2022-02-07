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
import ExpensesContext from "./context/ExpensesContext";
import BudgetContext from "./context/BudgetContext";
import "./css/normalize.css";
import { GlobalStyle } from "./css/globalStyles";

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
  //const budget = localStorage.getItem("budget");

  useEffect(() => {
    if (token) {
      expCtx.getExp(userId);
      budgCtx.getBudget(userId);
    }
  }, [token]);

  const isEditingFormHandler = () => {
    setIsEditing(true);
  };

  const stopIsEditingFormHandler = () => {
    setIsEditing(false);
  };

  const submitExpenseHandler = async (data) => {
    setLoading(true);
    expCtx.storeNewExp(userId, data);
    //budgCtx.storeBudget(userId, budgCtx.budget);

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
          {/* <Route path="budget" element={<Budget />} /> */}
          <Route
            path=""
            element={
              <Fragment>
                {!isEditingForm ? (
                  <button onClick={isEditingFormHandler}>
                    Add New Expense
                  </button>
                ) : (
                  <ExpenseForm
                    onSubmitNewExpense={submitExpenseHandler}
                    onCancel={stopIsEditingFormHandler}
                  />
                )}

                <YearFilter onChangeYear={setYear} />
                <Chart expenses={filteredExpenses} />
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

/**
 * when sign up => store default budget 5000 in local stor budgCtx.storeDefaultBudget(userId, defBudget)
 * when submit new exp => store budget from local store to user data budget.
 * when log in => get budget from db and store it in local stor
 * when change budget => show edit modal, budget can not be 0 for correct diagram
 * every time app is reloaded => get budget from db, store it in local stor and put it in budget page
 */
