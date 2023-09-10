import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'logins',
  initialState: {
    id: null,
    name: null,
    username: null,
    token: null,
    auth: false,
  },
  reducers: {
    setUser(state, action) {
      const { id, name, username, token } = action.payload
      state.id = id
      state.name = name
      state.username = username
      state.token = token
      state.auth = true
    },
    removeUser(state, action) {
      state.id = null
      state.name = null
      state.username = null
      state.token = null
      state.auth = false
    }
  },
})

export const { setUser, removeUser } = loginSlice.actions

export default loginSlice.reducer