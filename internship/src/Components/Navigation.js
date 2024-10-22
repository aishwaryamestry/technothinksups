import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Navbar,
  Container,
  Nav,
  Col,
  Offcanvas,
  Row,
  Stack,
} from "react-bootstrap";
import styled, { ThemeProvider } from "styled-components";
import { FaSun, FaMoon, FaCog, FaUserCircle, FaBars } from "react-icons/fa"; // Import icons including FaBars for hamburger
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./SignIn";
import MyProfile from "./MyProfile";
import SignUpForm from "./SignUpForm";
import { Link, useNavigate } from "react-router-dom";
import ForgotPass from "./ForgotPass";
import ChangePassword from "./ChangePassword";
import VerifyOtpForm from "./VerifyOtp";

// Define light and dark themes
const lightTheme = {
  bodyBg: "#f8f9fa",
  textColor: "#000",
  buttonBg: "#000",
  buttonText: "#fff",
  buttonHoverBg: "#333",
  modalBg: "#fff",
  modalTextColor: "#000",
  offcanvasBg: "#fff",
  linkColor: "#000", // Black links in light modelinkColor: "#000", // Black text
  linkBg: "#e0e0e0", // Light gray background
  linkHoverBg: "#ccc", // Slightly darker on hover
};

const darkTheme = {
  bodyBg: "#343a40",
  textColor: "#fff",
  buttonBg: "#fff",
  buttonText: "#000",
  buttonHoverBg: "#ddd",
  modalBg: "#495057",
  modalTextColor: "#fff",
  offcanvasBg: "#495057",
  linkColor: "#fff", // White text
  linkBg: "#444", // Dark background for links
  linkHoverBg: "#555", // Darker on hover
};

// Styled components for theming
const StyledApp = styled.div`
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.textColor};
  ${"" /* min-height: 100vh; */}
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.buttonBg} !important;
  color: ${(props) => props.theme.buttonText} !important;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const IconButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border:none;

  svg {
    transition: color 0.3s ease, transform 0.3s ease;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.buttonHoverBg}; /* Background hover effect */
  }

  &:hover svg {
    color: ${(props) =>
      props.theme.textColor === "#000"
        ? "#FFD7"
        : "#f39c12"}; /* Icon hover effect */
    transform: rotate(20deg); /* Slight rotation on hover */
  }
`;

const StyledModalBody = styled(Modal.Body)`
  background-color: ${(props) => props.theme.modalBg};
  color: ${(props) => props.theme.modalTextColor};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const StyledOffcanvas = styled(Offcanvas)`
  background-color: ${(props) => props.theme.offcanvasBg};
  color: ${(props) => props.theme.textColor};
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.linkColor};
  background-color: ${(props) => props.theme.linkBg}; // Background color
  padding: 10px; // Add padding for spacing
  text-decoration: none;
  border-radius: 5px; // Optional: Rounded corners
  display: block; // Makes it a block element, so it fills the container's width
  width: 100%; // Ensures full width of the parent Col

  &:hover {
    background-color: ${(props) => props.theme.linkHoverBg}; // Background change on hover
  }
`;

// Main App component
const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false); // Theme toggle state

  // State variables to control the visibility of modals and offcanvas
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false); // Offcanvas state for mobile
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);

  // Handlers to show/hide modals
  const handleShowSignIn = () => setShowSignIn(true);
  const handleShowSignUp = () => setShowSignUp(true);
  const handleShowProfile = () => setShowProfile(true);
  const handleShowSettings = () => setShowSettings(true);
  const handleShowForgotPass = () => setShowForgotPass(true);
  const handleShowChangePass = () => setShowChangePass(true);
  const handleShowVerifyOtp = () => setShowVerifyOtp(true);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleCloseProfile = () => setShowProfile(false);
  const handleCloseSettings = () => setShowSettings(false);
  const handleCloseOffcanvas = () => setShowOffcanvas(false); // Close the offcanvas
  const handleCloseForgotPass = () => setShowForgotPass(false);
  const handleCloseChangePass = () => setShowChangePass(false);
  const handleCloseVerifyOtp = () => setShowVerifyOtp(false);

  const navigate = useNavigate();
  // Load theme preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  // Toggle between dark and light themes and save preference to localStorage
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Set the current theme
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        {/* Navbar */}
        <Navbar
          className={darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}
          expand="lg"
        >
          <Container>
            <Col md={6}>
              <Navbar.Brand href="#">Hello TechnoThinksUp</Navbar.Brand>
            </Col>

            {/* Offcanvas Trigger for Small Screens */}
            <Navbar.Toggle
              aria-controls="navbarNav"
              onClick={() => setShowOffcanvas(true)} // Open offcanvas when the hamburger is clicked
            >
              <FaBars /> {/* Hamburger icon */}
            </Navbar.Toggle>

            {/* Collapsible Navbar Links for Large Screens */}
            <Navbar.Collapse id="navbarNav" className="justify-content-end">
              <Col>
                <Nav className="me-auto">
                  {/* Large screen links */}
                  <Nav.Link
                    as={Button}
                    variant="link"
                    onClick={() => navigate("/")}
                  >
                    Sign In
                  </Nav.Link>
                  <Nav.Link
                    as={Button}
                    variant="link"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Nav.Link>
                </Nav>
              </Col>
            </Navbar.Collapse>

            {/* Theme and other icons for larger screens */}
            <Col md={3} className="d-flex justify-content-end">
              {/* Theme toggle button */}
              <IconButton onClick={toggleTheme} aria-label="Toggle theme">
                {darkMode ? <FaSun /> : <FaMoon />}
              </IconButton>
              {/* Settings icon to open the offcanvas */}
              <IconButton
                onClick={handleShowSettings}
                aria-label="Open settings"
                style={{ marginLeft: "10px" }}
              >
                <FaCog />
              </IconButton>
              {/* Profile icon to open profile modal */}
              <IconButton
                onClick={handleShowProfile}
                aria-label="My Profile"
                style={{ marginLeft: "10px" }}
              >
                <FaUserCircle />
              </IconButton>
            </Col>
          </Container>
        </Navbar>

        {/* Offcanvas for Small Screens */}
        <StyledOffcanvas
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Mobile Links in the Offcanvas */}
            <Nav className="flex-column">
              <Nav.Link as={Button} variant="link" onClick={handleShowSignIn}>
                Sign In
              </Nav.Link>
              <Nav.Link as={Button} variant="link" onClick={handleShowSignUp}>
                Sign Up
              </Nav.Link>
              <Nav.Link as={Button} variant="link" onClick={handleShowSettings}>
                Settings
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </StyledOffcanvas>

        {/* SignIn Modal */}
        <Modal show={showSignIn} onHide={handleCloseSignIn} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            <SignIn handleCloseSignIn={handleCloseSignIn} />{" "}
            {/* Pass the close handler */}
          </StyledModalBody>
        </Modal>

        {/* SignUp Modal */}
        <Modal show={showSignUp} onHide={handleCloseSignUp} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            <SignUpForm />
          </StyledModalBody>
        </Modal>

        {/* Profile Modal */}
        <Modal show={showProfile} onHide={handleCloseProfile} centered>
          <Modal.Header closeButton>
            <Modal.Title>My Profile</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            <MyProfile />
          </StyledModalBody>
        </Modal>

        {/* Profile Modal */}
        <Modal show={showForgotPass} onHide={handleCloseForgotPass} centered>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            <ForgotPass />
          </StyledModalBody>
        </Modal>

        {/* SignIn Modal */}
        <Modal show={showChangePass} onHide={handleCloseChangePass} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            <ChangePassword />
          </StyledModalBody>
        </Modal>

        {/* SignIn Modal */}
        <Modal show={showVerifyOtp} onHide={handleCloseVerifyOtp} centered>
          <Modal.Header closeButton>
            <Modal.Title>Verify Otp</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            <VerifyOtpForm />
          </StyledModalBody>
        </Modal>

<Row>
<StyledOffcanvas
          show={showSettings}
          onHide={handleCloseSettings}
          placement="end"
        >
        <Col md={12}>  
        
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Settings</Offcanvas.Title>
            {/* Theme toggle button */}
            <Col md={4} className="m-4 px-1">
        <IconButton onClick={toggleTheme} aria-label="Toggle theme">
                {darkMode ? <FaSun /> : <FaMoon />}
              </IconButton>
        </Col>
          </Offcanvas.Header>
        </Col>
        
       
         
          <Offcanvas.Body>
            <Container>
              <Row>
                <Stack gap={3}>
                  <Col md={12}>
                    <StyledLink to="/profile" onClick={handleShowProfile}>
                   
                    Profile
                     
                    </StyledLink>
                  </Col>

                  <Col md={12}>
                    <StyledLink
                      to="/forgot-password"
                      onClick={handleShowForgotPass}
                    >
                      Forgot Password
                    </StyledLink>
                  </Col>

                  <Col md={12}>
                    <StyledLink to="/changepass" onClick={handleShowChangePass}>
                      Change Password
                    </StyledLink>
                  </Col>

                  <Col md={12}>
                    <StyledLink to="/verifyOtp" onClick={handleShowVerifyOtp}>
                      Verify Otp
                    </StyledLink>
                  </Col>
                </Stack>
              </Row>
            </Container>

           
          </Offcanvas.Body>
        </StyledOffcanvas>

</Row>
        {/* Settings Offcanvas */}
       
      </StyledApp>
    </ThemeProvider>
  );
};

export default Navigation;
