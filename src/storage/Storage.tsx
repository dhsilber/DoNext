import React from 'react'
import '../DoNext.css'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey, ProjectStorageKey, TaskStorageKey, TodoStorageKey, TrackStorageKey } from '../Constants'
import { EventSet, TodoSet, ProjectSet, TrackSet, TaskSet } from '../DoData'
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
    projects: [],
    last_id: 0,
}

export const defaultTrackData: TrackSet = {
    tracks: []
}

export const defaultTaskData: TaskSet = {
    tasks: [],
    last_id: 0,
}

const Storage = () => {

    const [todoStorage, setTodoStorage] = useLocalStorageState(TodoStorageKey, {
        defaultValue: defaultToDoData
    })

    const [eventStorage, setEventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })

    const [taskStorage, setTaskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })

    const [trackStorage, setTrackStorage] = useLocalStorageState(TrackStorageKey, {
        defaultValue: defaultEventData
    })

    const [projectStorage, setProjectStorage] = useLocalStorageState(ProjectStorageKey, {
        defaultValue: defaultProjectData
    })

    const todoData = JSON.stringify(todoStorage, null, 2)
    const eventData = JSON.stringify(eventStorage, null, 2)
    const taskData = JSON.stringify(taskStorage, null, 2)
    const trackData = JSON.stringify(trackStorage, null, 2)
    const projectData = JSON.stringify(projectStorage, null, 2)

    return <>
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
        <div className='storageTask'>
            <h3>Tasks Storage</h3>
            <LoadData setData={setTaskStorage} prompt={"Ingest tasks:"} />
            <UnloadData jsonData={taskData} prompt={"Download tasks"} fileName='doNextTasksDownload.json' />
        </div>
        <div className='storageTrack'>
            <h3>Tracks Storage</h3>
            <LoadData setData={setTrackStorage} prompt={"Ingest tracks:"} />
            <UnloadData jsonData={trackData} prompt={"Download tracks"} fileName='doNextTracksDownload.json' />
        </div>
        <div className='storageProject'>
            <h3>Projects Storage</h3>
            <LoadData setData={setProjectStorage} prompt={"Ingest projects:"} />
            <UnloadData jsonData={projectData} prompt={"Download projects"} fileName='doNextProjectsDownload.json' />
        </div>
    </>
}

export default Storage
