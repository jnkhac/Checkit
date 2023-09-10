import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { removeUser, setUser } from '../reducers/loginReducer';
import noteService from '../services/notes'
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { removeAuth } from '../reducers/signUpReducer';
import ratingService from '../services/ratings'
import savedNotesService from '../services/savedNotes'

const NavigationBar = () => {

  const dispatch = useDispatch()

  const auth = useSelector(state => state.login.auth)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(removeUser())
    dispatch(removeAuth())
    noteService.setToken(null)
    ratingService.setToken(null)
    savedNotesService.setToken(null)
  }

  const LoginDisplay = ({ currentUser }) => {
    if (auth) {
      return (
        <Nav className="me-auto">
          <NavDropdown title={currentUser}>
            <NavDropdown.Item onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      )
    }
    return (
      <>
        <Nav className="me-auto">
          <Nav.Link href="#" as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </>
    )
  }

  const followedTopics = useSelector(state => {
    if (auth) {
      return state.followedTopics
    }
    return null
  })

  const DropdownTopics = ({ topic, redirectPath }) => {
    return (
      <NavDropdown.Item href="#" as={Link} to={redirectPath}>
        {topic.name}
      </NavDropdown.Item>
    )
  }

  const ConditionalTabs = () => {
    if (useSelector(state => state.login.auth)) {
      return (
        <>
          <NavDropdown title="Followed Topics">
            {followedTopics.map(ft =>
              <DropdownTopics
                key={ft.id}
                topic={ft.topic}
                redirectPath={"/topics/" + ft.topicId}
              />
            )}
          </NavDropdown>
          <Nav.Link href="#" as={Link} to="/savednotes">Saved Notes</Nav.Link>
        </>
      )
    }
    return
  }

  const HomeLink = () => {
    if (useSelector(state => state.login.auth)) {
      return (
        <>
          <Nav.Link href="#" as={Link} to="/home">Home</Nav.Link>
        </>
      )
    }
    return
  }

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/home">Checkit</Navbar.Brand>
          <Nav className="me-auto">
            <HomeLink />
            <Nav.Link href="#" as={Link} to="/popular">Popular</Nav.Link>
            <Nav.Link href="#" as={Link} to="/topics">Topics</Nav.Link>
            <ConditionalTabs />
          </Nav>
        </Container>
        <LoginDisplay currentUser={useSelector(state => state.login.username)} />
      </Navbar>
      <br />
    </>
  )
}

export default NavigationBar