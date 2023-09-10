import { useParams } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import NewNote from "./NewNote"
import Notes from "./Notes"
import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"
import noteService from "../services/notes"
import topicService from "../services/topics"
import { useEffect, useState } from "react"

const TopicNotesPageAuth = () => {
    // const dispatch = useDispatch()
    // dispatch(filterChange(id))

    return (
        <>
            <NavigationBar />
            <Notes getFunction={noteService.getNotesByTopic} page={"Topics"} />
        </>
    )
}

export default TopicNotesPageAuth