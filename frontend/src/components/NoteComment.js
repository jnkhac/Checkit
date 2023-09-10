import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

import noteService from '../services/notes'
import ratingService from '../services/ratings'
import savedNotesService from '../services/savedNotes'
import { useParams } from "react-router-dom"
import Comments from "./Comments"
import SideColumn from "./SideColumn"

const NoteComment = ({ getFunction }) => {
    const [note, setNote] = useState([])
    const [alert, setAlert] = useState(false)

    const id = useParams().id

    useEffect(() => {
        getFunction({ id }).then(note => setNote(note))
    }, [getFunction, id])

    const currentUser = useSelector(state => state.login)

    const [saveButtonColour, setSaveButtonColour] = useState()
    const [upvoteColour, setUpvoteColour] = useState()
    const [downvoteColour, setDownvoteColour] = useState()

    const [saveText, setSaveText] = useState()
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        getFunction({ id }).then(note => setNote(note))
    }, [getFunction, id])

    useEffect(() => {
        if (note.rating !== null && note.rating === true) {
            setUpvoteColour("danger")
        } else {
            setUpvoteColour("secondary")
        }
        if (note.rating !== null && note.rating === false) {
            setDownvoteColour("info")
        } else {
            setDownvoteColour("secondary")
        }
        if (note.saved) {
            setSaveButtonColour("warning")
        } else {
            setSaveButtonColour("secondary")
        }
        if (note.saved) {
            setSaveText("Unsave")
        } else {
            setSaveText("Save")
        }
    }, [note.rating, note.saved])

    const handleSave = async () => {
        if (note.saved) {
            try {
                await savedNotesService.remove(note.id)
                const changedNote = {
                    ...note,
                    saved: !note.saved
                }
                setNote(changedNote)
                setSaveButtonColour("secondary")
                setSaveText("Save")
            } catch (exception) {
                setAlert(true)
            }
        } else {
            try {
                const newBookmark = {
                    userId: currentUser.id,
                    noteId: note.id
                }
                await savedNotesService.createNew(newBookmark)
                const changedNote = {
                    ...note,
                    saved: !note.saved
                }
                setNote(changedNote)
                setSaveButtonColour("warning")
                setSaveText("Unsave")
            } catch (exception) {
                setAlert(true)
            }
        }
    }

    const handleUpvote = async () => {
        if (note.rating !== null) {
            if (note.rating === true) {
                try {
                    await ratingService.remove(note.ratingId)
                    const changedNote = {
                        ...note,
                        rating: null,
                        upvotes: note.upvotes - 1
                    }
                    setNote(changedNote)
                    setUpvoteColour("secondary")
                } catch (exception) {
                    setAlert(true)
                }
            } else {
                try {
                    await ratingService.update(note.ratingId)
                    const changedNote = {
                        ...note,
                        rating: !note.rating,
                        upvotes: note.upvotes + 1,
                        downvotes: note.downvotes - 1
                    }
                    setNote(changedNote)
                    setUpvoteColour("danger")
                    setDownvoteColour("secondary")
                } catch (exception) {
                    setAlert(true)
                }
            }
        } else {
            try {
                const newRating = await ratingService.createNew({ value: true, userId: currentUser.id, noteId: note.id })
                const changedNote = {
                    ...note,
                    ratingId: newRating.id,
                    rating: true,
                    upvotes: note.upvotes + 1,
                }
                setNote(changedNote)
                setUpvoteColour("danger")
            } catch (exception) {
                setAlert(true)
            }
        }
    }

    const handleDownvote = async () => {
        if (note.rating !== null) {
            if (note.rating === false) {
                try {
                    await ratingService.remove(note.ratingId)
                    const changedNote = {
                        ...note,
                        rating: null,
                        downvotes: note.downvotes - 1
                    }
                    setNote(changedNote)
                    setDownvoteColour("secondary")
                } catch (exception) {
                    setAlert(true)
                }
            } else {
                try {
                    await ratingService.update(note.ratingId)
                    const changedNote = {
                        ...note,
                        rating: !note.rating,
                        downvotes: note.downvotes + 1,
                        upvotes: note.upvotes - 1
                    }
                    setNote(changedNote)
                    setUpvoteColour("secondary")
                    setDownvoteColour("info")
                } catch (exception) {
                    setAlert(true)
                }
            }
        } else {
            try {
                const newRating = await ratingService.createNew({ value: false, userId: currentUser.id, noteId: note.id })
                const changedNote = {
                    ...note,
                    ratingId: newRating.id,
                    rating: false,
                    downvotes: note.downvotes + 1,
                }
                setNote(changedNote)
                setDownvoteColour("info")
            } catch (exception) {
                setAlert(true)
            }
        }
    }

    const handleDelete = async () => {
        try {
            await noteService.remove(note.id)
            setHidden(true)
        } catch (exception) {
            console.log("note removal failed")
        }
    }

    const PleaseSignInAlert = () => {
        if (alert) {
            return (
                <Alert variant="warning">
                    Please log in
                </Alert>
            )
        }
        return
    }

    const Buttons = () => {
        const ConditionalButton = () => {
            if (note.author === currentUser.username) {
                return (
                    <>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </>
                )
            }
            return
        }
        if (currentUser.auth) {
            return (
                <>
                    <Button variant={saveButtonColour} onClick={handleSave}>{saveText}</Button>
                    <Button variant={upvoteColour} onClick={handleUpvote}>{note.upvotes}</Button>
                    <Button variant={downvoteColour} onClick={handleDownvote}>{note.downvotes}</Button>
                    <ConditionalButton />
                </>
            )
        }
        return (
            <>
                <Button variant={saveButtonColour} onClick={() => setAlert(true)}>{saveText}</Button>
                <Button variant={upvoteColour} onClick={() => setAlert(true)}>{note.upvotes}</Button>
                <Button variant={downvoteColour} onClick={() => setAlert(true)}>{note.downvotes}</Button>
            </>
        )
    }

    if (hidden) {
        return
    }
    return (
        <>
            <Container>
                <PleaseSignInAlert />
                <Row md={2}>
                    <Col lg={8} md={8} sm={16} xs={16}>
                        <ListGroup>
                            <Card style={{ margin: "10px" }}>
                                <Card.Header>{note.topic}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{note.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">u/{note.author} on {note.date}</Card.Subtitle>
                                    <Card.Text>{note.content}</Card.Text>
                                    <Buttons />
                                </Card.Body>
                            </Card>
                            <Comments />
                        </ListGroup>
                    </Col>
                    <Col lg={4} md={4} sm={8} xs={8}>
                        <SideColumn title={"r/" + note.topic} desc={note.topicDesc} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NoteComment