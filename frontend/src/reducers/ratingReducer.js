import { createSlice } from '@reduxjs/toolkit'


const RatingSlice = createSlice({
    name: 'ratings',
    initialState: [],
    reducers: {
        setRatings(state, action) {
            return action.payload
        },
        toggleRatingOf(state, action) {
            const id = action.payload
            const ratingToChange = state.find(r => r.id === id)
            const changedRating = {
                ...ratingToChange,
                value: !ratingToChange.value
            }
            return state.map(rating =>
                rating.id !== id ? rating : changedRating
            )
        },
        appendRating(state, action) {
            state.push(action.payload)
        },
        removeRating(state, action) {
            const id = action.payload
            return state.filter(rating =>
                rating.id !== id
            )
        }
    },
})

export const { setRatings, toggleRatingOf, appendRating, removeRating } = RatingSlice.actions
export default RatingSlice.reducer