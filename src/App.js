/**DOC
 * add full form validation from oreily module
 * create custom hook for fetch()
 * document the app
 * learn forms and inputs
 *
 * App
 * 1. Btn "create acc" clicked from <Welcome/> component -> createAccHandler()
 * 2. Btn "Sign in" clicked from <SignIn/> component -> signInHandler()
 * 3. Btn "log out" clicked from <Dashboard/> component -> logOutHandler()
 * 4. Btn "Profile" clicked from <Dashboard/> component -> profileHandler()
 * 5. Btn "Change budget" clicked from <Profile/> component -> changeBudgetHandler()
 * 6. Btn "Change password" clicked from <Profile/> component -> changePasswordHandler()
 * 7. Btn "Add expense" clicked from <Dashboard/> component -> addExpensedHandler()
 * 8.
 *
 * createAccHandler()
 * 1. fetch()
 * 2. if(!res.ok) -> display error message from recieved data object
 * 3. else -> store token, localId in authCtx object
 * 4. create new user with localId in DB, budget, email
 * 5. render <Dashboard/> with message "You have no expenses yet."
 *
 * signInHandler()
 * 1. fetch()
 * 2. if(!res.ok) -> display error message from recieved data object
 * 3. else -> store token, localId in authCtx object; request expenses from DB using
 * localId
 * 4. render <Dashboard/> and pass recieved expenses from DB to <Expenses/>
 *
 * logOutHandler()
 * 1. redirect to "/" and to "/welcome"
 *
 * profileHandler()
 * 1. take user localId and request budget from DB
 * 2. render <Profile/> and pass budget in it
 *
 *
 */
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
    title: "Surf1",
    cost: 1000,
    month: 1,
    day: "01",
    year: 2022,
  },
  {
    id: Math.random() * 5,
    title: "Surf1",
    cost: 1000,
    month: 1,
    day: "01",
    year: 2021,
  },
  {
    id: Math.random() * 5,
    title: "Surf1",
    cost: 2000,
    month: 1,
    day: "01",
    year: 2021,
  },
  {
    id: Math.random() * 5,
    title: "Surf1",
    cost: 1000,
    month: 2,
    day: "01",
    year: 2021,
  },
  {
    id: Math.random() * 5,
    title: "Surf1",
    cost: 1000,
    month: 11,
    day: "01",
    year: 2019,
  },
  {
    id: Math.random() * 5,
    title: "Surf1",
    cost: 1000,
    month: 12,
    day: "01",
    year: 2019,
  },
  {
    id: Math.random() * 5,
    title: "Surf1",
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

  const submitExpenseHandler = (data) => {
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
