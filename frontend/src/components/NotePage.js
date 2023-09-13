import NavigationBar from "./NavigationBar"
import noteService from "../services/notes"
import NoteComment from "./NoteComment"

const NotePage = () => {
    return (
        <>
            <NavigationBar />
            <NoteComment getFunction={noteService.getNoteById} />
        </>
    )
}

export default NotePage