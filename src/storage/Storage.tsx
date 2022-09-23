import React from 'react'
import '../DoNext.css'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey, TodoStorageKey } from '../Constants'
import { EventSet, TodoSet, ProjectSet } from '../DoData'
import LoadData from '../LoadData'
import UnloadData from '../UnloadData'

export const defaultToDoData: TodoSet = {
    todos: [
        { text: "Download default configuration", done: 0, days: [] },
        { text: "Edit to make it yours", done: 0, days: [] },
        { text: "Ingest your data", done: 0, days: [] },
    ]
}

export const defaultEventData: EventSet = {
    routine: [
        {
            text: "Sleep",
            start: 82800000,
            duration: 26400000
        },
        {
            text: "Work - morning",
            start: 30600000,
            duration: 14400000
        },
        {
            text: "Work - afternoon",
            start: 48600000,
            duration: 14400000
        }
    ],
    events: [
        { text: "Download default configuration", start: 0, duration: 0 },
        { text: "Edit to make it yours", start: 0, duration: 0 },
        { text: "Ingest your data", start: 0, duration: 0 },
    ]
}

export const defaultProjectData: ProjectSet = {
    projects: []
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
        <div className='storageTodo'>
            <h3>Todos Storage</h3>
            <LoadData setData={setTodoStorage} prompt={"Ingest todos:"} />
            <UnloadData jsonData={todoData} prompt={"Download todos"} fileName='doNextTodoDownload.json' />
        </div>
        <div className='storageEvent'>
            <h3>Events Storage</h3>
            <LoadData setData={setEventStorage} prompt={"Ingest events:"} />
            <UnloadData jsonData={eventData} prompt={"Download events"} fileName='doNextEventsDownload.json' />
        </div>
    </div>
}

export default Storage
