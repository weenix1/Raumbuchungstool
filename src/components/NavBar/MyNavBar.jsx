import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";

const MyNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const custFun = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {location.pathname === "/login" && (
        <Navbar className="navbar-color">
          <Navbar.Brand href="#home">Room Booking</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link onClick={custFun}>Logout</Nav.Link>
          </Nav>
          <Form inline>
            <Button
              className="signUp-button ml-2"
              onClick={() => navigate("/signUp")}
            >
              SignUp
            </Button>
          </Form>
        </Navbar>
      )}

      {location.pathname !== "/login" && (
        <Navbar className="home">
          <Navbar.Brand href="#home">Room Booking</Navbar.Brand>
          <Nav className="home-links ml-auto">
            <Nav.Link className="mr-2" href="/">
              Home
            </Nav.Link>
            <Nav.Link onClick={custFun}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      )}
    </div>
  );
};

export default MyNavBar;
