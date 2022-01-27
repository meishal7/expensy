import SignUp from "./components/SignUp";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LogIn from "./components/LogIn";
import AuthContext from "./context/AuthContext";
import { Fragment, useContext, useEffect, useState } from "react";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";
import ExpenseForm from "./components/ExpenseForm";
import YearFilter from "./components/YearFilter";
import Chart from "./components/Chart";
// import storeNewExpense from "./modules/storeNewExpense";
// import getExpenses from "./modules/getExpenses";
import ExpensesContext from "./context/ExpensesContext";

function App() {
  const authCtx = useContext(AuthContext);
  const expCtx = useContext(ExpensesContext);
  //const [expenses, setExpenses] = useState([]);
  const [selectedYear, setYear] = useState(2022);
  const [isEditingForm, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (token) {
      expCtx.getExp(userId);
    }
  }, [token]);
  //expCtx.getExp(authCtx.id);

  // Get expenses from db
  // useEffect(() => {
  //   expCtx.getExp(authCtx.id);
  // async function fetchExpenses(id) {
  //   const expenses = await getExpenses(id);
  //   const data = Object.keys(expenses)?.map((id) => ({
  //     ...expenses[id],
  //     id,
  //   }));
  //   setExpenses(data);
  //   return data;
  // }
  // if (authCtx.token && authCtx.id) {
  //   fetchExpenses(authCtx.id);
  // }
  //}, [authCtx.token, authCtx.id]);

  const isEditingFormHandler = () => {
    setIsEditing(true);
  };

  const stopIsEditingFormHandler = () => {
    setIsEditing(false);
  };
  // Store new expense in db
  const submitExpenseHandler = async (data) => {
    setLoading(true);
    expCtx.storeNewExp(userId, data);

    //await storeNewExpense(data, authCtx.id);
    //const expenses = await getExpenses(authCtx.id);

    // const expensesData = Object.keys(expenses)?.map((id) => ({
    //   ...expenses[id],
    //   id,
    // }));

    //setExpenses((prevExpenses) => expensesData);

    setLoading(false);
    setIsEditing(false);
  };

  const filteredExpenses = expCtx.expenses.filter((expense) => {
    return expense.year === selectedYear;
  });

  return (
    <Fragment>
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
          <Route path="budget" element={<Budget />} />
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
