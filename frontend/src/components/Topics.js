import topicService from '../services/topics'
import followedTopicsService from '../services/followedTopics'

import {
    Button,
    Card, Container, ListGroup,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Topic = ({ topic }) => {
    const [text, setText] = useState('Follow')
    const [followedTopics, setfollowedTopics] = useState()
    const currentUser = useSelector(state => state.login)

    useEffect(() => {
        if (currentUser.auth) {
            followedTopicsService.getUserFollowedTopics().then(fts => {
                setfollowedTopics(fts)
            })
        }
    }, [currentUser])

    const ConditionalButton = () => {
        if (currentUser.auth) {
            return (
                <>
                    <Button>
                        {text}
                    </Button>
                </>
            )
        }
        return
    }

    return (
        <>
            <Card style={{ margin: "10px" }}>
                <Link to={'/topics/' + topic.id}>
                    <Card.Header>{topic.name}</Card.Header>
                </Link>
                <Card.Body>
                    <Card.Text>{topic.desc}</Card.Text>
                    <ConditionalButton />
                </Card.Body>
            </Card>
            <br />
        </>
    )
}

const Topics = () => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        topicService
            .getAll().then(topics => setTopics(topics))
    }, [])

    return (
        <>
            <Container>
                <ListGroup>
                    {topics.map(topic =>
                        <Topic
                            key={topic.id}
                            topic={topic}
                        />
                    )}
                </ListGroup>
            </Container>
        </>
    )
}

export default Topics