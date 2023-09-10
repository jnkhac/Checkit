import { createSlice } from '@reduxjs/toolkit'


const topicSlice = createSlice({
    name: 'topics',
    initialState: [],
    reducers: {
        createTopic(state, action) {
            const newTopic = action.payload
            state.push(newTopic)
        },
        setTopics(state, action) {
            return action.payload
        }
    },
})

export const { createTopic, setTopics } = topicSlice.actions
export default topicSlice.reducer