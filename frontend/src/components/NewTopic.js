import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'
import topicService from '../services/topics'
import { Button, Col, Container, Form, InputGroup, Navbar, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { setUser } from '../reducers/loginReducer'
import { createTopic } from '../reducers/topicReducer'
import ratingService from '../services/ratings'
import savedNotesService from '../services/savedNotes'
import { useNavigate } from 'react-router-dom'
import SideColumn from './SideColumn'

const NewTopic = ({ name, desc }) => {
    const dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            noteService.setToken(user.token)
            ratingService.setToken(user.token)
            savedNotesService.setToken(user.token)
            setIsLoggedIn(true)
        }
    }, [])

    const addTopic = async (event) => {
        event.preventDefault()

        const topic = {
            name: event.target.name.value,
            desc: event.target.desc.value,
        }

        try {
            const newTopic = await topicService.createNew(topic)
            event.target.name.value = ''
            event.target.desc.value = ''
            navigate("/topics")
        } catch (exception) {
            console.log(exception)
        }
    }

    const NewTopicUI = () => {
        if (isLoggedIn) {
            return (
                <>
                    <Container>
                        <Form role="form" className=" " onSubmit={addTopic}>
                            <Form.Group>
                                <Row md={2}>
                                    <Col lg={8} md={8} sm={16} xs={16}>
                                        <Form.Label>
                                            <h3>
                                                <strong>
                                                    Create New Topic
                                                </strong>
                                            </h3>
                                        </Form.Label>
                                        <Form.Control style={{ margin: "10px" }}
                                            name="name"
                                            value={name}
                                            placeholder="Name" />
                                        <Form.Control style={{ margin: "10px" }}
                                            name="desc"
                                            value={desc}
                                            as="textarea"
                                            placeholder="Description" />
                                        <Button type="submit" style={{ margin: "10px" }}>
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col lg={4} md={4} sm={8} xs={8}>
                                        <SideColumn title={"Checkit Creation Tool"} desc={"Rules: ..."} />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Container>
                </>
            )
        }
        return
    }

    return (
        <NewTopicUI />
    )
}

export default NewTopic