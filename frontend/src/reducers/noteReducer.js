import { createSlice } from '@reduxjs/toolkit'


const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            const newNote = action.payload
            state.push(newNote)
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        },
        removeNote(state, action) {
            const id = action.payload
            return state.filter(note =>
                note.id !== id
            )
        },
        addUpvote(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                upvotes: noteToChange.upvotes++
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        minusUpvote(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                upvotes: noteToChange.upvotes--
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        addDownvote(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                downvotes: noteToChange.downvotes++
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        minusDownvote(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                downvotes: noteToChange.downvotes--
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
    },
})

export const { createNote, toggleImportanceOf, appendNote, setNotes, removeNote, addUpvote, minusUpvote, addDownvote, minusDownvote } = noteSlice.actions
export default noteSlice.reducer