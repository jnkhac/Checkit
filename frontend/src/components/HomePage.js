import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import noteService from '../services/notes'


const HomePage = () => {
    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getHomeNotes} page={"Home"} />
        </>
    )
}

export default HomePage