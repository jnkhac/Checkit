import { useDispatch } from "react-redux"
import NavigationBar from "./NavigationBar"
import NewNote from "./NewNote"
import Notes from "./Notes"
import { filterChange } from "../reducers/filterReducer"
import noteService from '../services/notes'


const PopularPageAuth = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange('ALL'))

    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getPopularAuthNotes} page={"Popular"} />
        </>
    )
}

export default PopularPageAuth