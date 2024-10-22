import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // State to store feedback messages (errors or success)
  const [message, setMessage] = useState("");

  // State to track password strength
  const [passwordStrength, setPasswordStrength] = useState("");

  // Initialize registered emails in localStorage
  useEffect(() => {
    const emails = ["user@gmail.com", "test@gmail.com"];
    localStorage.setItem("registeredEmails", JSON.stringify(emails));
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the formData state for the corresponding field
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength when the password field changes
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    const strengthCriteria = [
      /.{8,}/, // Minimum length of 8 characters
      /[a-z]/, // At least one lowercase letter
      /[A-Z]/, // At least one uppercase letter
      /[0-9]/, // At least one digit
      /[\W_]/, // At least one special character
    ];

    // Calculate strength score based on criteria met
    const score = strengthCriteria.reduce(
      (acc, regex) => acc + (regex.test(password) ? 1 : 0),
      0
    );

    // Set password strength based on score
    const strength =
      score === 5 ? "strong" : score >= 3 ? "medium" : score > 0 ? "weak" : "";
    setPasswordStrength(strength);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { fullName, email, password, confirmPassword } = formData;

    // Validate that all fields are filled
    if (!fullName || !email || !password || !confirmPassword) {
      return setMessage("All fields are required.");
    }

    // Validate that password and confirm password match
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    // Retrieve registered emails from local storage
    const registeredEmails =
      JSON.parse(localStorage.getItem("registeredEmails")) || [];

    // Check if the email is already registered
    if (registeredEmails.includes(email)) {
      return setMessage("This email is already registered.");
    }

    // If all checks pass, register the email
    registeredEmails.push(email);
    localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));

    // Set success message and reset form
    setMessage("Registration successful! You can now log in.");
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    setPasswordStrength("");
  };

  // Function to get the color for password strength
  const getStrengthColor = (strength) => {
    switch (strength) {
      case "strong":
        return "green";
      case "medium":
        return "orange";
      case "weak":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <Container className="mt-4">
    <Row>
    <h2>Sign Up</h2>
      <Col md={8} className="shadow py-3 mt-3 bg-transparent rounded">
      <Col md={8} className="p-2">
    {message && (
        <Alert variant={message.includes("success") ? "success" : "danger"}>
          {message}
        </Alert>
      )}
    </Col>
      <Form onSubmit={handleSubmit}>
        {["fullName", "email", "password", "confirmPassword"].map(
          (field, index) => (
            <Form.Group
              key={index}
              controlId={`form${
                field.charAt(0).toUpperCase() + field.slice(1)
              }`}
            >
              <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
              <Form.Control
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
              {field === "password" && passwordStrength && (
                <div style={{ color: getStrengthColor(passwordStrength) }}>
                  Password Strength: {passwordStrength}
                </div>
              )}
            </Form.Group>
          )
        )}
        <Button variant="primary" type="submit" className="mt-3 px-3">
          Sign Up
        </Button>
      </Form>
      <div className="mt-3">
        <Link to="/">Already have an account? Sign In</Link>
      </div>
      </Col>
      
    </Row>
     

     
    </Container>
  );
};

export default SignUpForm;
