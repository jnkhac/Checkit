import noteService from '../services/notes'
import topicService from '../services/topics'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import SideColumn from './SideColumn'
import { useNavigate } from 'react-router-dom'

const NewNote = ({ topicId }) => {
  const navigate = useNavigate()

  const addNote = async (event) => {
    event.preventDefault()

    const topics = await topicService.getAll()
    const targetTopic = topics.find(topic => topic.name === event.target.topic.value)

    const note = {
      title: event.target.title.value,
      content: event.target.content.value,
      topicId: targetTopic.id
    }

    try {
      const newNote = await noteService.createNew(note)
      event.target.title.value = ''
      event.target.content.value = ''
      event.target.topic.value = ''
      navigate("/home")
    } catch (exception) {
      console.log(exception)
    }
  }

  const NewNoteUI = () => {
    return (
      <>
        <Container>
          <Form role="form" className=" " onSubmit={addNote}>
            <Row md={2}>
              <Col lg={8} md={8} sm={16} xs={16}>
                <Form.Label>
                  <h3>
                    <strong>
                      Create New Note
                    </strong>
                  </h3>
                </Form.Label>
                <Form.Group>
                  <Form.Control style={{ margin: "10px" }}
                    name="topic"
                    placeholder="Topic" />
                  <Form.Control style={{ margin: "10px" }}
                    name="title"
                    placeholder="Title" />
                  <Form.Control style={{ margin: "10px" }}
                    name="content"
                    as="textarea"
                    placeholder="Content" />
                  <Button type="submit" style={{ margin: "10px" }}>
                    Submit
                  </Button>
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={8} xs={8}>
                <SideColumn title={"Checkit Creation Tool"} desc={"Rules: ..."} />
              </Col>
            </Row>
          </Form >
        </Container >
      </>
    )
  }

  return (
    <NewNoteUI />
  )
}

export default NewNote