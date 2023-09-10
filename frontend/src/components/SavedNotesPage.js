import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import noteService from '../services/notes'

const SavedNotesPage = () => {
    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getSavedNotes} page={"Saved Notes"} />
        </>
    )
}

export default SavedNotesPage