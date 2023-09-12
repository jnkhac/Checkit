import { useEffect } from 'react'
import noteService from './services/notes'
import topicService from './services/topics'
import { useDispatch, useSelector } from 'react-redux'
import BootStrapStyle from './components/BootStrapStyle'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import { setUser } from './reducers/loginReducer'
import PopularPage from './components/PopularPage'
import PopularPageAuth from './components/PopularPageAuth'
import SignUpPage from './components/SignUpPage'
import TopicsPage from './components/TopicsPage'
import TopicsPageAuth from './components/TopicsPageAuth'
import savedNotesService from './services/savedNotes'
import SavedNotesPage from './components/SavedNotesPage'
import followedTopicsService from './services/followedTopics'
import { setfollowedTopics } from './reducers/followedTopicsReducer'
import ratingService from './services/ratings'
import commentService from './services/comments'
import TopicNotesPage from './components/TopicNotesPage'
import TopicNotesPageAuth from './components/TopicNotesPageAuth'
import NotePage from './components/NotePage'
import NotePageAuth from './components/NotePageAuth'
import NewNotePage from './components/NewNotePage'
import NewTopicPage from './components/NewTopicPage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      noteService.setToken(user.token)
      ratingService.setToken(user.token)
      savedNotesService.setToken(user.token)
      followedTopicsService.setToken(user.token)
      commentService.setToken(user.token)
      topicService.setToken(user.token)
    }
  }, [dispatch])

  const loginAuth = useSelector(state => state.login.auth)
  const signUpAuth = useSelector(state => state.signup.auth)

  useEffect(() => {
    if (loginAuth) {
      followedTopicsService
        .getUserFollowedTopics().then(followedTopics => dispatch(setfollowedTopics(followedTopics)))
    }
  }, [dispatch, loginAuth])

  return (
    <div className="fluid-container">
      <BootStrapStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={!loginAuth ? <Navigate replace to="/home/auth" /> : <HomePage />} />
          <Route
            path="/home/auth"
            element={!loginAuth ? <Navigate replace to="/popular" /> : <Navigate replace to="/home" />} />
          <Route
            path="/popular"
            element={!loginAuth ? <PopularPage /> : <PopularPageAuth />} />
          <Route
            path="/topics"
            element={!loginAuth ? <TopicsPage /> : <TopicsPageAuth />} />
          <Route
            path="/savednotes"
            element={!loginAuth ? <Navigate replace to="/savednotes/auth" /> : <SavedNotesPage />} />
          <Route
            path="/savednotes/auth"
            element={!loginAuth ? <Navigate replace to="/popular" /> : <Navigate replace to="/savednotes" />} />
          <Route
            path="/login"
            element={<LoginPage />} />
          <Route
            path="/signup"
            element={loginAuth ? <Navigate replace to="/popular" /> :
              signUpAuth ? <Navigate replace to="/login" /> : <SignUpPage />} />
          <Route
            path="/topics/:id"
            element={!loginAuth ? <TopicNotesPage /> : <TopicNotesPageAuth />} />
          <Route
            path="/notes/:id"
            element={!loginAuth ? <NotePage /> : <NotePageAuth />} />
          <Route
            path="/newNote"
            element={!loginAuth ? <Navigate replace to="/newNote/auth" /> : <NewNotePage />} />
          <Route
            path="/newNote/auth"
            element={!loginAuth ? <Navigate replace to="/popular" /> : <Navigate replace to="/newNote" />} />
          <Route
            path="/newTopic"
            element={!loginAuth ? <Navigate replace to="/newTopic/auth" /> : <NewTopicPage />} />
          <Route
            path="/newTopic/auth"
            element={!loginAuth ? <Navigate replace to="/popular" /> : <Navigate replace to="/newTopic" />} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App