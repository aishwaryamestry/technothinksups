import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, ModalTitle, Row } from 'react-bootstrap';

const ForgotPass = () => {
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  const[error,setError]=useState('');

  useEffect(()=>{
    const savedEmail=localStorage.getItem('forgotPasswordEmail');
    if(savedEmail){
      setEmail(savedEmail);
    }
    return () => {
      //optionally clear email on unmount
      setEmail('');
      setMessage('');
      setError('');
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    //validate email format
    if (!/\S+@\S+\.\S+/.test(email)){
      setError('please enter valid email address.');
      return;
    } 
    
    //  // Retrieve registered emails from localStorage
    //  const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];

    // Simulate sending a reset link (replace with actual API call)
    const registeredEmails=["user@gmail.com","test@gmail.com"];
    if(registeredEmails.includes(email)){
      setMessage('A password reset link has been sent to your email address. ');
      //Store the email in local Storage
      localStorage.setItem('forgotPasswordEmail',email)
    }
    else{
      setError('this email is not registered.');
    }

    //clear the input field after submission
    setEmail('');
  }
  
  return (
   <Container>
   
  <Row className='d-flex justify-content-center align-items-center'>
  
  <Col md={12} className='p-1'>
  {message && <Alert variant='success' aria-live='polite'>{message}</Alert>}
  {error && <Alert variant='danger' aria-live='assertive'>{error}</Alert>}
  </Col>
 
 <Form onSubmit={handleSubmit}>
 
  <Form.Group controlId='formBasicEmail'>
  
  <Col md={12} className='p-3'>
  <p className='fw-bold'>Forgot Password form</p>
          <Form.Label className='p-1'>Email</Form.Label>
         
         <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            requiredaria-label="email"
            isInvalid={error && !/\S+@\S+\.\S+/.test(email)}
          />
         
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Col>
      </Form.Group>
  
  <Col md={12} className='p-3'>
  <Button variant='primary' type="submit">
        Send Reset Link
      </Button>
  </Col>
      

      
    </Form>
  

   
  </Row>
   

   </Container>
  )
}

export default ForgotPass;
