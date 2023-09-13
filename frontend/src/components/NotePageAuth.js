import NavigationBar from "./NavigationBar"
import noteService from "../services/notes"
import NoteComment from "./NoteComment"

const NotePageAuth = () => {
    return (
        <>
            <NavigationBar />
            <NoteComment getFunction={noteService.getNoteByIdAuth} />
        </>
    )
}

export default NotePageAuth