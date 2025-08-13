import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../services/user'
import { Container, Card, Form, Button } from 'react-bootstrap'


function Login() {
  const [info, setInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const onLogin = async () => {
    const { email, password } = info
    if (email.length === 0) toast.warn('Please enter Email!')
    else if (password.length === 0) toast.warn('Please enter Password!')
    else {
      const response = await loginUser(email, password)
      if (response.status === 200) {
        const token = response.data
        console.log(token)
        localStorage.setItem("token", token);
        navigate('/')
      } else {
        toast.error(`Error: ${response.data.msg}`)
      }
    }
  }

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

          <Button variant='primary' onClick={onLogin} className='w-100'>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

export default Login
