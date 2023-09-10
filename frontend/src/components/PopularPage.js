import { useDispatch } from "react-redux"
import NavigationBar from "./NavigationBar"
import Notes from "./Notes"
import { filterChange } from "../reducers/filterReducer"
import noteService from '../services/notes'


const PopularPage = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange('ALL'))

    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getPopularNotes} page={"Popular"} />
        </>
    )
}

export default PopularPage