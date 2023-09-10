import { createSlice } from '@reduxjs/toolkit'


const noteSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    createUser(state, action) {
      const newUser = action.payload
      state.push(newUser)
    },
    toggleDisabledOf(state, action) {
      const id = action.payload
      const userToChange = state.find(n => n.id === id)
      const changedUser = {
        ...userToChange,
        disabled: !userToChange.disabled
      }
      return state.map(user =>
        user.id !== id ? user : changedUser
      )
    },
    toggleAdminOf(state, action) {
      const id = action.payload
      const userToChange = state.find(n => n.id === id)
      const changedUser = {
        ...userToChange,
        administartor: !userToChange.administartor
      }
      return state.map(user =>
        user.id !== id ? user : changedUser
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { createNote, toggleDisabledOf, toggleAdminOf } = noteSlice.actions
export default noteSlice.reducer