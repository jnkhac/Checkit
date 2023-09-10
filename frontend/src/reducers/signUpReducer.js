import { createSlice } from '@reduxjs/toolkit'

const signUpSlice = createSlice({
    name: 'signups',
    initialState: {
        auth: false
    },
    reducers: {
        setAuth(state, action) {
            state.auth = true
        },
        removeAuth(state, action) {
            state.auth = false
        }
    },
})

export const { setAuth, removeAuth } = signUpSlice.actions

export default signUpSlice.reducer