import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [strength, setStrength] = useState("");
  const [strengthColor, setStrengthColor] = useState("");
  const [inputBgColor, setInputBgColor] = useState("");

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    if (password.length < 6) {
      setStrength("Weak");
      setStrengthColor("red");
      setInputBgColor("#ffcccb"); // Light red
    } else if (password.length < 10) {
      setStrength("Moderate");
      setStrengthColor("orange");
      setInputBgColor("#ffe0b2"); // Light orange
    } else {
      setStrength("Strong");
      setStrengthColor("green");
      setInputBgColor("#c8e6c9"); // Light green
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      // Handle password change logic here
      console.log("Password changed successfully!");
    }
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
        <p className="fw-bold">Change Password Form</p>
          <Col md={12} className="p-2">
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Enter current password"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col md={12} className="p-2">
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  placeholder="Enter new password"
                  style={{ backgroundColor: inputBgColor }} // Set background color
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </Button>
              </div>
              <div className="mt-1" style={{ color: strengthColor }}>
                Strength: {strength}
              </div>
            </Form.Group>
          </Col>

          <Col md={12} className="p-2">
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col md={12} className="p-2">
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>

          <Col md={12} className="p-2">
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default ChangePassword;
