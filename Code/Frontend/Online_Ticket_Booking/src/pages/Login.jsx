import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser, fetchUserDetails } from '../services/user'
import { Container, Card, Form, Button } from 'react-bootstrap'
// import jwt_decode from "jwt-decode";

function Login() {
  const [info, setInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const handleLogin = async (e) => {
    const { email, password } = info
    e.preventDefault();
    try {
      // 1️⃣ Authenticate & get token
      const response = await loginUser( email, password ); 
      const token = response.data;
      localStorage.setItem("token", token);
      const userData = await fetchUserDetails()
      console.log(userData)

      // 3️⃣ Redirect based on role
      switch (userData.role) {
        case "ROLE_ADMIN":
          navigate("/admin", { replace: true });
          break;
        case "ROLE_THEATRE_OWNER":
          navigate("/dashboard", { replace: true });
          break;
        case "ROLE_CUSTOMER":
        default:
          navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <Card className='shadow-lg p-4 rounded' style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className='text-center mb-4'>Login</h2>

        <Form>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </Form.Group>

          <div className='mb-3 text-end'>
            <span className='text-muted'>Don't have an account? </span>
            <Link to='/signup'>Register</Link>
          </div>

          <Button variant='primary' onClick={handleLogin} className='w-100'>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

export default Login
