import React, { useState, useEffect } from "react";
import { Button, Container, Form, Alert, Row, Col } from "react-bootstrap";

const VerifyOtpForm = () => {
  // State to hold OTP input and message
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setMessage("OTP has expired. Please request a new one.");
    }
  }, [isTimerActive, timer]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus on the next input
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Verify the OTP
  const verifyOtp = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setMessage("OTP verified successfully!"); // Simulate success message
    } else {
      setMessage("OTP must be 6 digits.");
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setMessage("OTP has been resent.");
    setTimer(60);
    setIsTimerActive(true);
  };

  return (
    <Container className="mt-2">
    <Row>
    <Col md={12} className="p-2">
    {message && <Alert variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}
    </Col>
      
      <Col md={12} className="p-2">
      <Form>
      <p className="fw-bold">Verify Otp</p>
      <Col md={6}>
      <div className="d-flex justify-content-between mb-3">
          {otp.map((value, index) => (
            <Form.Control
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              style={{ width: "50px", textAlign: "center", margin: "0 5px" }}
            />
          ))}
        </div>
      </Col>
        
        <Button variant="primary" onClick={verifyOtp} className="me-3">Verify</Button>
        <Button variant="link" onClick={handleResend}>Resend OTP</Button>
      </Form>
      </Col>

      <Col md={12} className="p-2">
      {isTimerActive && <div className="mt-3">Resend OTP in: {timer} seconds</div>}
      </Col>
      
    </Row>
     
    </Container>
  );
};

export default VerifyOtpForm;