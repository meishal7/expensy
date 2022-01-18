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
import { Fragment, useContext } from "react";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";

function App() {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  //console.log("initial render", !!authCtx.token);

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
          <Route path="" element={<Expenses />} />
        </Route>
        <Route path="*" element={<SignUp />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
