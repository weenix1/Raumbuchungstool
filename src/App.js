import "./App.css";
import HomePage from "./components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavBar from "./components/NavBar/MyNavBar";
import SignIn from "./components/SignIn/SignIn";
import BookingForm from "./components/Bookings/BookingForm";
import SignUp from "./components/SignUp/SignUp";
import Bookings from "./components/Bookings/Bookings";

function App() {
  return (
    <Router>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/:id" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
