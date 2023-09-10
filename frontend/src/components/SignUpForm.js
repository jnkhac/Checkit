import { useDispatch, useSelector } from 'react-redux'
import { setAuth, setCreationSuccessful } from '../reducers/signUpReducer'
import userService from '../services/users'
import noteService from '../services/notes'

import {
    Form,
    Button,
    Alert
} from 'react-bootstrap'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LoginAlert = ({ status, message }) => {
    if (!status) {
        return
    }
    return (
        <Alert variant={status}>
            {message}
        </Alert>
    )
}

const SignUpForm = ({ name, username, password }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)

    // useEffect(() => {
    //     const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    //     if (loggedUserJSON) {
    //         const user = JSON.parse(loggedUserJSON)
    //         dispatch(setUser(user))
    //         noteService.setToken(user.token)
    //     }
    // }, [])

    const HandleSignUp = async (event) => {
        event.preventDefault()

        const content = {
            name: event.target.name.value,
            username: event.target.username.value,
            password: event.target.password.value
        }

        try {
            await userService.createNew(content)
            event.target.name.value = ''
            event.target.username.value = ''
            event.target.password.value = ''
            dispatch(setAuth())
        } catch (exception) {
            setStatus('danger')
            setMessage('Invalid name, username, or password')
        }
    }

    return (
        <>
            <br />
            <LoginAlert status={status} message={message} />
            <Form onSubmit={HandleSignUp}>
                <Form.Label><h2><strong>Sign Up</strong></h2></Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        value={name}
                        placeholder="Enter name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        value={username}
                        placeholder="Enter username"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </>
    )
}

export default SignUpForm