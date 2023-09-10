import { useDispatch } from "react-redux"
import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import { filterChange } from "../reducers/filterReducer"
import noteService from "../services/notes"
import NoteComment from "./NoteComment"
import Comments from "./Comments"

const NotePageAuth = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange('ALL'))

    return (
        <>
            <NavigationBar />
            <NoteComment getFunction={noteService.getNoteByIdAuth} />
        </>
    )
}

export default NotePageAuth