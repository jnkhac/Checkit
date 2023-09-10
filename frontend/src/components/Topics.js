import topicService from '../services/topics'

import {
    Card, Container, ListGroup,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Topic = ({ topic }) => {
    return (
        <>
            <Card style={{ margin: "10px" }}>
                <Link to={'/topics/' + topic.id}>
                    <Card.Header>{topic.name}</Card.Header>
                </Link>
                <Card.Body>
                    <Card.Text>{topic.desc}</Card.Text>
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