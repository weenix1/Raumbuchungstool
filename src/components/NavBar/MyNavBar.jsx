import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="dark" variant="dark">
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
    </div>
  );
};

export default MyNavBar;
