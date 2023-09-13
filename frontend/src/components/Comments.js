import { useSelector } from 'react-redux'

import {
    Card,
    Button,
    Container,
    Form,
    ListGroup,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'

import commentService from '../services/comments'
import { useParams } from 'react-router-dom'

const Comment = ({ comment }) => {
    return (
        <>
            <Card style={{ margin: "10px" }}>
                <Card.Body>
                    <Card.Subtitle>{"u/" + comment.user.username}</Card.Subtitle>
                    <Card.Text>{comment.content}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

const Comments = () => {
    const [comments, setComments] = useState([])

    const id = useParams().id

    useEffect(() => {
        commentService.getAllByNote({ id }).then(comments => setComments(comments))
    }, [id])

    const currentUserId = useSelector(state => state.login.id)

    const NewComment = () => {

        const addComment = async (event) => {
            event.preventDefault()

            const comment = {
                content: event.target.comment.value,
                date: new Date(),
                userId: currentUserId,
                noteId: id
            }

            try {
                const newComment = await commentService.createNew(comment)
                comments.push(newComment)
                event.target.comment.value = ''
            } catch (exception) {
                console.log(exception)
            }
        }

        return (
            <>
                <div style={{ height: '8px' }} />
                <Container>
                    <Form role="form" className=" " onSubmit={addComment}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                name="comment"
                                as="textarea"
                                placeholder="Add comment"
                                rows={3} />
                            <div style={{ height: '10px' }} />
                            <Button type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </>
        )
    }

    return (
        <>
            <Container>
                <NewComment />
                <hr />
                <ListGroup>
                    {comments.map(comment =>
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />
                    )}
                </ListGroup>
            </Container>
        </>
    )
}

export default Comments