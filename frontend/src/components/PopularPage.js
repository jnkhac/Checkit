import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import noteService from '../services/notes'


const PopularPage = () => {
    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getPopularNotes} page={"Popular"} />
        </>
    )
}

export default PopularPage