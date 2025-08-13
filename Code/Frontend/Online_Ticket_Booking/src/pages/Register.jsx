import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, fetchUserDetails } from '../services/user'
import { toast } from 'react-toastify'
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button
} from 'react-bootstrap'

function Register() {
  const navigate = useNavigate()

  const [info, setInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile_no: '',
    gender: '',
    dob: '',
    role: 'ROLE_CUSTOMER',
    address: {
      addr_line1: '',
      addr_line2: '',
      town_city: '',
      state: '',
      district: '',
      pincode: ''
    }
  })

  const onRegister = async () => {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      mobile_no,
      gender,
      role,
      dob,
      address: {
        addr_line1,
        addr_line2,
        town_city,
        state,
        pincode,
        district
      }
    } = info

    // Validation
    if (firstname.length === 0) return alert('Please enter First Name')
    if (lastname.length === 0) return alert('Please enter Last Name')
    if (email.length === 0) return alert('Please enter Email')
    if (password.length === 0 || password !== confirmPassword)
      return alert('Passwords do not match')
    if (mobile_no.length === 0) return alert('Please enter Mobile No.')
    if (gender.length === 0) return alert('Please select Gender')
    if (addr_line1.length === 0) return alert('Please enter Address Line 1')
    if (town_city.length === 0) return alert('Please enter Town/City')
    if (district.length === 0) return alert('Please enter District')
    if (state.length === 0) return alert('Please enter State')

    const response = await registerUser(
      firstname,
      lastname,
      email,
      password,
      mobile_no,
      gender,
      role,
      dob,
      addr_line1,
      addr_line2,
      town_city,
      state,
      pincode,
      district
    )
    if (response.status === 201) {
      localStorage.setItem("token",response.data)
      const user = await fetchUserDetails()
      toast.success(`Welcome to BooKar, ${user.firstname} !`)
      navigate('/')
    } else {
      toast.error(`Error: ${response.data.msg}`)
    }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh'}}>
      <Card className='p-4 shadow-lg rounded' style={{ width: '100%', maxWidth: '700px', overflowY: 'auto', height: 'calc(80vh - 80px)'}}>
        <h2 className='text-center mb-4'>Register</h2>
        <Form>
          <h5 className='mb-3'>Personal Details</h5>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter first name'
                  onChange={(e) => setInfo({ ...info, firstname: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter last name'
                  onChange={(e) => setInfo({ ...info, lastname: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter phone number'
                  onChange={(e) => setInfo({ ...info, mobile_no: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  onChange={(e) => setInfo({ ...info, password: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  onChange={(e) => setInfo({ ...info, gender: e.target.value })}
                >
                  <option value=''>Select Gender</option>
                  <option value='MALE'>Male</option>
                  <option value='FEMALE'>Female</option>
                  <option value='OTHER'>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type='date'
                  onChange={(e) => setInfo({ ...info, dob: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className='mb-3'>Address Details</h5>
          <Row>
            <Col md={12}>
              <Form.Group className='mb-3'>
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Street address, P.O. Box'
                  onChange={(e) => setInfo({
                    ...info,
                    address: { ...info.address, addr_line1: e.target.value }
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className='mb-3'>
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Apartment, suite, unit, etc.'
                  onChange={(e) => setInfo({
                    ...info,
                    address: { ...info.address, addr_line2: e.target.value }
                  })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Town/City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your city'
                  onChange={(e) => setInfo({
                    ...info,
                    address: { ...info.address, town_city: e.target.value }
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>District</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your district'
                  onChange={(e) => setInfo({
                    ...info,
                    address: { ...info.address, district: e.target.value }
                  })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your state'
                  onChange={(e) => setInfo({
                    ...info,
                    address: { ...info.address, state: e.target.value }
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your pincode'
                  onChange={(e) => setInfo({
                    ...info,
                    address: { ...info.address, pincode: e.target.value }
                  })}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className='text-end mb-3'>
            <span className='text-muted'>Already have an account? </span>
            <Link to='/signin'>Login</Link>
          </div>

          <Button variant='success' className='w-100' onClick={onRegister}>
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

export default Register
