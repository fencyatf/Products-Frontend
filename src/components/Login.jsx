import React, { useState } from 'react'
import { Button,Form,Card,Container,Row,Col, CardBody } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = ({onLogin}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const navigate = useNavigate()

    //handleSubmit
    //request object

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Client-side validations
        if (!email) {
            setErrorMessage("Please enter a valid email");
            return;
        }
        if (!password || password.length < 5) {
            setErrorMessage("Please enter a valid password");
            return;
        }
    
        // Data to pass to API
        const data = {
            email: email,
            password: password
        };
    
        // API call with CORS fix
        try {
            const response = await axios.post(
                "https://products-backend-hgk5.onrender.com/login", data)  
                console.log(response.data)
                alert(response.data.message)
                onLogin()
                navigate('/products')

            } catch (error) {
                setErrorMessage(error.message)
                console.log(error)
            }
    }
    

  return (
    <Container className='d-flex justify-content-center align-items-center min-vh-100'>
        <Row>
            <Col>
                <Card className='shadow-lg p-4 rounded-3' style={{width:'22rem'}}>
                    <Card.Body>
                        <h3 className='text-center mb-4'>Login</h3>
                        {
                            errorMessage && (<div className='alert alert-danger' role='alert'>{errorMessage}</div>)
                        }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit'className='w-100'> 
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Login