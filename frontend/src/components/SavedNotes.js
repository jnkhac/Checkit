// import { useDispatch, useSelector } from 'react-redux'
// import { toggleImportanceOf } from '../reducers/noteReducer'

// import {
//     Card,
//     Button,
//     Row,
//     Container,
//     Col,
// } from 'react-bootstrap'

// const Note = ({ note, handleClick }) => {
//     const user = useSelector(state => state.login.username)
//     if (user) {
//         if (user === note.user.username) {
//             return (
//                 <>
//                     <Card>
//                         <Card.Header>{note.topic.name}</Card.Header>
//                         <Card.Body>
//                             <Card.Title>{note.title}</Card.Title>
//                             <Card.Subtitle className="mb-2 text-muted">Posted by {note.user.username} on {note.date}</Card.Subtitle>
//                             <Card.Text>{note.content}</Card.Text>
//                             <Button variant="primary" onClick={handleClick}>View</Button>
//                             <Button variant="secondary" onClick={handleClick}>Save</Button>
//                             <Button variant="info" onClick={handleClick}>Upvote</Button>
//                             <Button variant="danger" onClick={handleClick}>Downvote</Button>
//                             <Button variant="danger" onClick={handleClick}>Delete</Button>
//                         </Card.Body>
//                     </Card>
//                     <br />
//                 </>
//             )
//         }
//         return (
//             <>
//                 <Card>
//                     <Card.Header>{note.topic.name}</Card.Header>
//                     <Card.Body>
//                         <Card.Title>{note.title}</Card.Title>
//                         <Card.Subtitle className="mb-2 text-muted">Posted by {note.user.username} on {note.date}</Card.Subtitle>
//                         <Card.Text>{note.content}</Card.Text>
//                         <Button variant="primary" onClick={handleClick}>View</Button>
//                         <Button variant="secondary" onClick={handleClick}>Save</Button>
//                         <Button variant="info" onClick={handleClick}>Upvote</Button>
//                         <Button variant="danger" onClick={handleClick}>Downvote</Button>

//                     </Card.Body>
//                 </Card>
//                 <br />
//             </>
//         )
//     }
//     return (
//         <>
//             <Card>
//                 <Card.Header>{note.topic.name}</Card.Header>
//                 <Card.Body>
//                     <Card.Title>{note.title}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">Posted by {note.user.username} on {note.date}</Card.Subtitle>
//                     <Card.Text>{note.content}</Card.Text>
//                     <Button variant="primary" onClick={handleClick}>View</Button>
//                 </Card.Body>
//             </Card>
//             <br />
//         </>
//     )
// }

// const SavedNotes = () => {
//     const dispatch = useDispatch()

//     const savedNotes = useSelector(state => state.savedNotes)
//     const username = useSelector(state => state.login.username)
//     const filter = savedNotes.filter(savedNote => savedNote.user.username === username)
//     const notes = filter.map(filter => filter.note)

//     return (
//         <>
//             <br />
//             <Container>
//                 <ul>
//                     <Row md={2}>
//                         <Col lg={8} md={8} sm={16} xs={16}>
//                             {notes.map(note =>
//                                 <Note
//                                     key={note.id}
//                                     note={note}
//                                     handleClick={() =>
//                                         dispatch(toggleImportanceOf(note.id))
//                                     }
//                                 />
//                             )}
//                         </Col>
//                         <Col lg={3} md={3} sm={6} xs={6}>
//                             {notes.map(note =>
//                                 <Note
//                                     key={note.id}
//                                     note={note}
//                                     handleClick={() =>
//                                         dispatch(toggleImportanceOf(note.id))
//                                     }
//                                 />
//                             )}
//                         </Col>
//                     </Row>
//                 </ul>
//             </Container>
//         </>
//     )
// }

// export default SavedNotes