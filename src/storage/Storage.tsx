import React from 'react'
import './Storage.css'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey, TodoStorageKey } from '../Constants'
import { DoEventsData, DoNextData } from '../DoData'
import LoadData from '../LoadData'
import UnloadData from '../UnloadData'

export const defaultToDoData: DoNextData = {
    todos: [
        { text: "Download default configuration", done: 0 },
        { text: "Edit to make it yours", done: 0 },
        { text: "Ingest your data", done: 0 },
    ]
}

export const defaultEventData: DoEventsData = {
    events: [
        { text: "Download default configuration", start: 0, duration: 0 },
        { text: "Edit to make it yours", start: 0, duration: 0 },
        { text: "Ingest your data", start: 0, duration: 0 },
    ]
}

const Storage = () => {

    const [todoStorage, setTodoStorage] = useLocalStorageState(TodoStorageKey, {
        defaultValue: defaultToDoData
    })

    const [eventStorage, setEventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })

    const todoData = JSON.stringify(todoStorage, null, 2)
    const eventData = JSON.stringify(eventStorage, null, 2)

    return <div className='storage'>
        <div className='storage-area'>
            <h3>Todos Storage</h3>
            <LoadData setData={setTodoStorage} prompt={"Ingest todos:"}/>
            <UnloadData jsonData={todoData} prompt={"Download todos"} fileName='doNextDownload.json' />
        </div>
        <div className='storage-area'>
            <h3>Events Storage</h3>
            <LoadData setData={setEventStorage} prompt={"Ingest events:"}/>
            <UnloadData jsonData={eventData} prompt={"Download events"} fileName='doNextEventsDownload.json'/>
        </div>
    </div>
}

export default Storage
