import React, { useState } from 'react';
import { Form, Button, Alert, Image, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email] = useState('user@example.com'); // Non-editable
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullName') setFullName(value);
    if (name === 'phoneNumber') setPhoneNumber(value);
    if (name === 'address') setAddress(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      if (!validFormats.includes(file.type)) {
        setError('Invalid file format. Please upload a JPEG, PNG, or GIF.');
        setProfilePicture(null);
        setPreview(null);
        return;
      }
      
      if (file.size > maxFileSize) {
        setError('File size exceeds 2MB. Please upload a smaller image.');
        setProfilePicture(null);
        setPreview(null);
        return;
      }

      setError('');
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const phoneRegex = /^[0-9]{10}$/; // Adjust regex for your requirements
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone number must be 10 digits long.');
      return;
    }

    // Simulate successful profile update
    setSuccess('Profile updated successfully!');
    console.log({ fullName, email, phoneNumber, address, profilePicture });
  };

  const handleReset = () => {
    setFullName('');
    setPhoneNumber('');
    setAddress('');
    setProfilePicture(null);
    setPreview(null);
    setError('');
    setSuccess('');
  };

  return (
    <Container>
    <Row>
    <Form onSubmit={handleSubmit}>

    <Col md={12} className='p-2'>
    <Form.Group controlId="fullName">
    <p className='fw-bold'>My Profile Form</p>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={fullName} 
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </Form.Group>
    </Col>
      
<Col md={12} className='p-2'>
<Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} readOnly />
      </Form.Group>
</Col>
     

<Col md={12} className='p-2'>
<Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          required
          placeholder="Enter your phone number"
        />
      </Form.Group>
</Col>
     
<Col md={12} className='p-2'>
<Form.Group controlId="address">
        <Form.Label>Address (optional)</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </Form.Group>
</Col>
      
<Col md={12} className='p-2'>
<Form.Group controlId="profilePicture">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleFileChange}
        />
        {preview && <Image src={preview} rounded className="mt-2" style={{ maxWidth: '200px' }} />}
      </Form.Group>
</Col>
     
<Col md={12} className='p-2'>
{error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
</Col>
     
     <Row className='d-flex justify-content-center'>
     <Col md={6} className='p-2 d-flex justify-content-center'>
     <Button variant="primary" type="submit">
        Save Profile
      </Button>
     </Col>
     
     <Col md={6} className='p-2'>
     <Button variant="secondary" type="button" onClick={handleReset} className="ml-2">
        Reset to Default
      </Button>
     </Col>
     </Row>
     
     
    </Form>
    </Row>

    </Container>
    
  );
};

export default MyProfile;
