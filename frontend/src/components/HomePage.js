import { useDispatch } from "react-redux"
import NavigationBar from "./NavigationBar"
import NewNote from "./NewNote"
import Notes from "./Notes"
import { filterChange } from "../reducers/filterReducer"
import { useEffect, useState } from "react"
import noteService from '../services/notes'


const HomePage = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange('ALL'))

    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getHomeNotes} page={"Home"} />
        </>
    )
}

export default HomePage