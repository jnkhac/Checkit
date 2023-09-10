import { useDispatch } from "react-redux"
import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import { filterChange } from "../reducers/filterReducer"
import Comments from "./Comments"
import noteService from "../services/notes"
import NoteComment from "./NoteComment"
import { useParams } from "react-router-dom"

const NotePage = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange('ALL'))

    return (
        <>
            <NavigationBar />
            <NoteComment getFunction={noteService.getNoteById} />
        </>
    )
}

export default NotePage