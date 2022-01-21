import SignUp from "./components/SignUp";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import AuthContext from "./context/AuthContext";
import { Fragment, useContext, useState } from "react";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";
import ExpenseForm from "./components/ExpenseForm";
import YearFilter from "./components/YearFilter";
import Chart from "./components/Chart";

const DUMMY_EXPENSES = [
  {
    id: Math.random() * 5,
    title: "dummy",
    cost: 1000,
    month: 1,
    day: "01",
    year: 2022,
  },
  {
    id: Math.random() * 5,
    title: "dummy",
    cost: 1000,
    month: 1,
    day: "01",
    year: 2021,
  },
  {
    id: Math.random() * 5,
    title: "dummy",
    cost: 2000,
    month: 1,
    day: "01",
    year: 2021,
  },
  {
    id: Math.random() * 5,
    title: "dummy1",
    cost: 1000,
    month: 2,
    day: "01",
    year: 2021,
  },
  {
    id: Math.random() * 5,
    title: "dummy",
    cost: 1000,
    month: 11,
    day: "01",
    year: 2019,
  },
  {
    id: Math.random() * 5,
    title: "dummy",
    cost: 1000,
    month: 12,
    day: "01",
    year: 2019,
  },
  {
    id: Math.random() * 5,
    title: "dummy",
    cost: 1000,
    month: 12,
    day: "01",
    year: 2019,
  },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [selectedYear, setYear] = useState(2022);
  const [isEditingForm, setIsEditing] = useState(false);

  const isEditingFormHandler = () => {
    setIsEditing(true);
  };

  const stopIsEditingFormHandler = () => {
    setIsEditing(false);
  };

  const submitExpenseHandler = async (data) => {
    // store in db
    const expData = {
      id: authCtx.id,
      ...data,
    };
    const res = await fetch(
      "https://expensy-db-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(expData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const dataBack = await res.json();
    console.log(dataBack);

    // store in db ends here

    const expenseData = {
      ...data,
      id: Math.random().toString(),
    };
    setExpenses((prevExpenses) => [expenseData, ...prevExpenses]);
    setIsEditing(false);
  };

  const filteredExpenses = expenses.filter((expense) => {
    return expense.year === selectedYear;
  });

  const authCtx = useContext(AuthContext);
  const location = useLocation();

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
