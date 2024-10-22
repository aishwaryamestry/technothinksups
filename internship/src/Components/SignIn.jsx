import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  //Load Saved email from local storage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Simulate sign-in process (replace with actual sign-in logic)
    setTimeout(() => {
      console.log("Signed in with:", { email, password, rememberMe });

      // Store email in local storage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // Clear password field after submission
      setPassword("");
      setLoading(false);
      setMessage("Sign-in successful! Redirecting...");
      setTimeout(() => {
        // Redirect to a different page after successful sign-in
        navigate("/signup"); // Change to your desired path
      }, 2000);
    }, 1000); // Simulating network delay
  };

  return (
    <Container>
      <h1 className="mt-5 pt-2 mx-2">Sign In</h1>
      <Col md={7} className="signin shadow py-3 mt-4 bg-transparent rounded">
        <Row className="d-flex justify-content-center">
          <Col md={9}>
            {error && <Alert variant="danger">{error}</Alert>}
            {Message && (
              <Alert variant="success" aria-live="polite">
                {Message}
              </Alert>
            )}
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Row className="d-flex justify-content-center m-4">
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center p-2"
              >
                <Form.Label>Email/Username</Form.Label>
              </Col>
              <Col md={7}>
                <Form.Control
                  type="text"
                  placeholder="Enter email/username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={email && !/\S+@\S+\.\S+/.test(email)}
                  aria-label="Email/Username"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Row className="d-flex justify-content-center p-2 m-2">
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center p-2"
              >
                <Form.Label>Password</Form.Label>
              </Col>
              <Col md={7}>
                <div className="input-group">
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setPasswordVisible((prev) => !prev)}
                    aria-label={
                      passwordVisible ? "Hide Password" : "Show Password"
                    }
                  >
                    {passwordVisible ? "hide" : "show"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Row className="d-flex justify-content-center p-2 m-2">
              <Col md={10}>
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                />
              </Col>
            </Row>

            <Row className="d-flex justify-content-center p-2">
              <Col md={4}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="px-4"
                  style={{ transition: "background-color 0.3s" }}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <Row className="d-flex justify-content-center p-3">
          <Col md={4}>
            <Link to="/forgot-password">Forgot Password ?</Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default SignIn;
