import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import noteService from '../services/notes'


const PopularPageAuth = () => {
    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getPopularAuthNotes} page={"Popular"} />
        </>
    )
}

export default PopularPageAuth