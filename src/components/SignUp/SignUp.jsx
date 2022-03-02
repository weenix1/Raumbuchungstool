import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAccountAtom } from "../../atoms/atoms";
import { useAuthGuard } from "../../Tools/tools";

const SignUp = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND;

  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);
  console.log("userAccount::", userAccount);

  const registerUser = async () => {
    try {
      let response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        body: JSON.stringify(userAccount),
        headers: { "Content-Type": "application/json" },
      });
      console.log("here is response", response);
      if (response.ok) {
        let data = await response.json();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration ">
      <Container className="pt-5">
        <div className="SignUpForm">
          <h1 className="SignInHeading">SIGN UP</h1>
          <div noValidate>
            <Form.Group>
              <Form.Control
                size="md"
                className="SignUpFormControls mt-3"
                type="text"
                name="firstName"
                value={userAccount.firstName}
                onChange={(e) =>
                  setUserAccount({ ...userAccount, firstName: e.target.value })
                }
                placeholder="Firstname"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                size="md"
                className=" mt-3"
                type="text"
                name="surName"
                value={userAccount.surName}
                onChange={(e) =>
                  setUserAccount({ ...userAccount, surName: e.target.value })
                }
                placeholder="Surname"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={userAccount.email}
                onChange={(e) =>
                  setUserAccount({ ...userAccount, email: e.target.value })
                }
                name="email"
                className=" mt-3"
                size="md"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className=" mt-3"
                size="md"
                type="password"
                name="password"
                value={userAccount.password}
                onChange={(e) =>
                  setUserAccount({ ...userAccount, password: e.target.value })
                }
                placeholder="Password"
              />
            </Form.Group>

            <Button
              variant="primary"
              className="SignUpButton mt-3"
              onClick={registerUser}
            >
              Sign Up
            </Button>
            <Form.Text>
              Already a User?{" "}
              <Link to="/login">
                <a href="#signin">Sign In</a>
              </Link>
            </Form.Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
