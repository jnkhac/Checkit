import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import noteService from "../services/notes"

const TopicNotesPageAuth = () => {
    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getNotesByTopic} page={"Topics"} />
        </>
    )
}

export default TopicNotesPageAuth