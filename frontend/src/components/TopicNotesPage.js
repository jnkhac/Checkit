import { useParams, useSearchParams } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"
import noteService from "../services/notes"

const TopicNotesPage = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange(id))

    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getNotesByTopic} page={"Topics"} />
        </>
    )
}

export default TopicNotesPage