import { createSlice } from '@reduxjs/toolkit'


const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const savedNoteSlice = createSlice({
    name: 'savedNotes',
    initialState: [],
    reducers: {
        createSavedNote(state, action) {
            const newSavedNote = action.payload
            state.push(newSavedNote)
        },
        setSavedNotes(state, action) {
            return action.payload
        },
        removeSavedNote(state, action) {
            const id = action.payload
            return state.filter(rating =>
                rating.id !== id
            )
        }
    },
})

export const { createSavedNote, setSavedNotes, removeSavedNote } = savedNoteSlice.actions
export default savedNoteSlice.reducer