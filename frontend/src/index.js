import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import loginReducer from './reducers/loginReducer'
import signUpReducer from './reducers/signUpReducer'
import topicReducer from './reducers/topicReducer'
import savedNotesReducer from './reducers/savedNotesReducer'
import followedTopicsReducer from './reducers/followedTopicsReducer'
import ratingReducer from './reducers/ratingReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
    login: loginReducer,
    signup: signUpReducer,
    topics: topicReducer,
    savedNotes: savedNotesReducer,
    followedTopics: followedTopicsReducer,
    ratings: ratingReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
