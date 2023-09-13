import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import loginService from '../services/logins'
import noteService from '../services/notes'
import ratingService from '../services/ratings'
import savedNotesService from '../services/savedNotes'
import followedTopicsService from '../services/followedTopics'
import commentService from '../services/comments'
import topicService from '../services/topics'

import {
    Form,
    Button,
    Alert,
    Container
} from 'react-bootstrap'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUpText = () => {
    if (useSelector(state => state.signup.auth)) {
        return
    }
    return (
        <Form.Text className="text-muted">
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </Form.Text>
    )
}

const LoginAlert = ({ status, message, signup }) => {
    if (!signup) {
        if (!status) {
            return
        } else {
            return (
                <Alert variant={status}>
                    {message}
                </Alert>
            )
        }
    }
    return (
        <Alert variant="success">
            Registration successful, please login!
        </Alert>
    )
}

const LoginForm = ({ username, password }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)

    const HandleLogin = async (event) => {
        event.preventDefault()

        const content = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        try {
            const user = await loginService.login(content)
            event.target.username.value = ''
            event.target.password.value = ''
            noteService.setToken(user.token)
            ratingService.setToken(user.token)
            savedNotesService.setToken(user.token)
            followedTopicsService.setToken(user.token)
            commentService.setToken(user.token)
            topicService.setToken(user.token)
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            dispatch(setUser(user))
            navigate("/home")
        } catch (exception) {
            setStatus('danger')
            setMessage('Invalid username or password')
        }
    }

    return (
        <>
            <Container>
                <LoginAlert
                    status={status}
                    message={message}
                    signup={useSelector(state => state.signup.creationSuccessful)} />
                <Form onSubmit={HandleLogin}>
                    <Form.Label><h3><strong>Log in</strong></h3></Form.Label>
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
                        <SignUpText />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default LoginForm