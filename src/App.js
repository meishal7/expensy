/**DOC
 * add full form validation from oreily module
 * create custom hook for fetch()
 * document the app
 * learn forms and inputs
 */
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
