import "./App.css";
import HomePage from "./components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavBar from "./components/NavBar/MyNavBar";

function App() {
  return (
    <Router>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
