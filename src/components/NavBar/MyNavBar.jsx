import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import {
  useNavigate,
  useLocation,
  useParams,
  matchPath,
} from "react-router-dom";
import "./styles.scss";

const MyNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/login" && (
        <Navbar className="navbar-color">
          <Navbar.Brand href="#home">Room Booking</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/bookings">Booking</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info" onClick={() => navigate("/signUp")}>
              SignUp
            </Button>
          </Form>
        </Navbar>
      )}

      {location.pathname !== "/login" && (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Room Booking</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/bookings">Booking</Nav.Link>
          </Nav>
        </Navbar>
      )}
    </div>
  );
};

export default MyNavBar;
