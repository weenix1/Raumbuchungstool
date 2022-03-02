import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import "./styles.scss";
import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useAuthGuard } from "../../Tools/tools";
import { useRecoilState } from "recoil";
import { userProfile as userProfileAtom } from "../../atoms/atoms";

const SignIn = () => {
  useAuthGuard();
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [error, setError] = useState(false);

  const BASE_URL = process.env.REACT_APP_BACKEND;

  const navigate = useNavigate();

  const fetchUser = async () => {
    // e.preventDefault();
    try {
      let response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(userProfile),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        let data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate("/");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login ">
      <Container className="pt-5">
        {error ? <Alert>Email or password is incorrect</Alert> : ""}
        <Card className="login-card">
          <Card.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={userProfile.email}
                onChange={(e) => {
                  setUserProfile({ ...userProfile, email: e.target.value });
                }}
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="SignInFormControls mt-3"
                size="md"
                type="password"
                name="password"
                value={userProfile.password}
                placeholder="Password"
                onChange={(e) =>
                  setUserProfile({ ...userProfile, password: e.target.value })
                }
              />
            </Form.Group>

            <Button
              id="btng"
              className="btn-login mt-3"
              onClick={() => fetchUser()}
            >
              Login
            </Button>

            <span style={{ alignSelf: "center" }}>
              Do you already have account?
            </span>
            <div id="newReg">
              <Link to="/signUp">
                <p
                  style={{
                    alignSelf: "center",
                    color: "#45407f",
                    fontWeight: "bold",
                  }}
                >
                  New registration
                </p>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default SignIn;
