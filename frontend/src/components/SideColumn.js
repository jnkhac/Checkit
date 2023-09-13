import { Button, Card, Row } from "react-bootstrap"

import { Link } from "react-router-dom"

const SideColumn = ({ title, desc }) => {
    return (
        <>
            <Card style={{ margin: "10px" }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{desc}</Card.Subtitle>
                    <hr />
                    <Row>
                        <Link to={"/newNote"} >
                            <Button style={{ width: '100%' }}>
                                <Card.Text>Create Note</Card.Text>
                            </Button>
                        </Link>
                    </Row>
                    <div style={{ height: '10px' }} />
                    <Row>
                        <Link to={"/newTopic"}>
                            <Button style={{ width: '100%' }}>
                                <Card.Text>Create Topic</Card.Text>
                            </Button>
                        </Link>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default SideColumn