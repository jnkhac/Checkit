import { createSlice } from '@reduxjs/toolkit'


const followedTopicsSlice = createSlice({
    name: 'followedTopics',
    initialState: [],
    reducers: {
        setfollowedTopics(state, action) {
            return action.payload
        }
    },
})

export const { setfollowedTopics } = followedTopicsSlice.actions
export default followedTopicsSlice.reducer