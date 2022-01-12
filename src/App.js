import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
