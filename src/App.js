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
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Profile from "./components/Account";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
