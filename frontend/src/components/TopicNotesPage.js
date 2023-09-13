import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import noteService from "../services/notes"

const TopicNotesPage = () => {
    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getNotesByTopic} page={"Topics"} />
        </>
    )
}

export default TopicNotesPage