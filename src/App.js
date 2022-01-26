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
import storeNewExpense from "./modules/storeNewExpense";
import getExpenses from "./modules/getExpenses";

function App() {
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setYear] = useState(2022);
  const [isEditingForm, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchExpenses(id) {
      const expenses = await getExpenses(id);
      console.log(expenses);
      const data = Object.keys(expenses)?.map((id) => ({
        ...expenses[id],
        id,
      }));
      console.log(data);
      setExpenses(data);
      return data;
    }
    if (authCtx.token && authCtx.id) {
      console.log(authCtx.id);
      fetchExpenses(authCtx.id);
    }
  }, [authCtx.token, authCtx.id]);

  const location = useLocation();

  const isEditingFormHandler = () => {
    setIsEditing(true);
  };

  const stopIsEditingFormHandler = () => {
    setIsEditing(false);
  };

  const submitExpenseHandler = async (data) => {
    setLoading(true);
    // Store new expense in db
    await storeNewExpense(data, authCtx.id);
    setLoading(false);

    const expenseData = {
      ...data,
      id: Math.random().toString(),
    };

    setExpenses((prevExpenses) => [
      expenseData,
      ...authCtx.data,
      ...prevExpenses,
    ]);

    setIsEditing(false);
  };
  console.log(expenses);
  const filteredExpenses = expenses.filter((expense) => {
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
