import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import noteService from '../services/notes'
import ratingService from '../services/ratings'
import savedNotesService from '../services/savedNotes'
import topicService from '../services/topics'

import SideColumn from "./SideColumn"

const Notes = ({ getFunction, page }) => {
    const [notes, setNotes] = useState([])
    const [alert, setAlert] = useState(false)
    const [tName, setTName] = useState()
    const [tDesc, setTDesc] = useState()

    const id = useParams().id

    useEffect(() => {
        getFunction({ id }).then(notes => {
            setNotes(notes)
        })
    }, [getFunction, id])

    useEffect(() => {
        if (id) {
            topicService.getById({ id }).then(topic => {
                setTName(topic.name)
                setTDesc(topic.desc)
            })
        }
    }, [id])

    const currentUser = useSelector(state => state.login)

    const PleaseSignInAlert = ({ alert }) => {
        if (alert) {
            return (
                <Alert variant="warning">
                    Please log in
                </Alert>
            )
        }
        return
    }

    const Note = ({ note }) => {
        const [saveButtonColour, setSaveButtonColour] = useState()
        const [upvoteColour, setUpvoteColour] = useState()
        const [downvoteColour, setDownvoteColour] = useState()

        const [saveText, setSaveText] = useState()
        const [hidden, setHidden] = useState(false)

        useEffect(() => {
            if (currentUser.auth) {
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
            } else {
                setUpvoteColour("secondary")
                setDownvoteColour("secondary")
                setSaveButtonColour("secondary")
                setSaveText("Save")
            }
        }, [note])

        const handleSave = async () => {
            if (note.saved) {
                try {
                    await savedNotesService.remove(note.id)
                    const changedNote = {
                        ...note,
                        saved: !note.saved
                    }
                    const newNotes = notes.map(n =>
                        n.id !== note.id ? n : changedNote
                    )
                    setNotes(newNotes)
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
                    const newNotes = notes.map(n =>
                        n.id !== note.id ? n : changedNote
                    )
                    setNotes(newNotes)
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
                        const newNotes = notes.map(n =>
                            n.id !== note.id ? n : changedNote
                        )
                        setNotes(newNotes)
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
                        const newNotes = notes.map(n =>
                            n.id !== note.id ? n : changedNote
                        )
                        setNotes(newNotes)
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
                    const newNotes = notes.map(n =>
                        n.id !== note.id ? n : changedNote
                    )
                    setNotes(newNotes)
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
                        const newNotes = notes.map(n =>
                            n.id !== note.id ? n : changedNote
                        )
                        setNotes(newNotes)
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
                        const newNotes = notes.map(n =>
                            n.id !== note.id ? n : changedNote
                        )
                        setNotes(newNotes)
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
                    const newNotes = notes.map(n =>
                        n.id !== note.id ? n : changedNote
                    )
                    setNotes(newNotes)
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
            // setSaveButtonColour('secondary')
            // setUpvoteColour('secondary')
            // setDownvoteColour('secondary')
            return (
                <>
                    <Button variant={saveButtonColour} onClick={() => setAlert(true)}>{saveText}</Button>
                    <Button variant={upvoteColour} onClick={() => setAlert(true)}>{note.upvotes}</Button>
                    <Button variant={downvoteColour} onClick={() => setAlert(true)}>{note.downvotes}</Button>
                </>
            )
        }

        const Content = () => {
            let limitedContent = note.content
            if (note.content.length >= 500) {
                for (let i = 500; i >= 0; i--) {
                    if (note.content[i] === " ") {
                        let content = note.content.substring(0, i)
                        limitedContent = content + "..."
                        break
                    }
                }
            }
            return (
                <>
                    <Card.Text>{limitedContent}</Card.Text>
                </>
            )
        }

        if (hidden) {
            return
        }
        return (
            <>
                <Card style={{ margin: "10px" }}>
                    <Card.Header>r/{note.topic}</Card.Header>
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">u/{note.author} on {note.date}</Card.Subtitle>
                        <Content />
                        <Link to={'/notes/' + note.id}>
                            <Button variant="primary">View</Button>
                        </Link>
                        <Buttons />
                    </Card.Body>
                </Card >
            </>
        )
    }

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        if (page === "Home") {
            setTitle(page)
            setDesc("Your personal Checkit frontpage. Come here to check in with your followed topics.")
        } else if (page === "Popular") {
            setTitle(page)
            setDesc("The best posts on Checkit. Come here to check in with the most upvoted notes.")
        } else if (page === "Saved Notes") {
            setTitle(page)
            setDesc("Your saved notes are stored here. Come here to reminisce about the notes you have viewed.")
        } else if (page === "Topics") {
            setTitle("c/" + tName)
            setDesc(tDesc)
        }
    }, [page, tName, tDesc])

    if (notes.length === 0) {
        return (
            <>
                <Container>
                    <PleaseSignInAlert alert={alert} />
                    <Row md={2}>
                        <Col lg={8} md={8} sm={16} xs={16}>
                            <h2 style={{ margin: "10px" }}>No notes available</h2>
                        </Col>
                        <Col lg={4} md={4} sm={8} xs={8}>
                            <SideColumn title={title} desc={desc} />
                        </Col>
                    </Row>
                </Container >
            </>
        )
    }

    return (
        <>
            <Container>
                <PleaseSignInAlert alert={alert} />
                <Row md={2}>
                    <Col lg={8} md={8} sm={16} xs={16}>
                        <ListGroup>
                            {notes.map(note =>
                                <Note
                                    key={note.id}
                                    note={note}
                                />
                            )}
                        </ListGroup>
                    </Col>
                    <Col lg={4} md={4} sm={8} xs={8}>
                        <SideColumn title={title} desc={desc} />
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Notes