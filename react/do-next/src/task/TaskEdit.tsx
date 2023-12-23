import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { ProjectStorageKey } from '../Constants'
import { Task } from '../DoData'
import { defaultProjectData } from '../storage/Storage'

interface TaskEditProps {
    task: Task
    save: (track: Task) => void
}

const TaskEdit = ({ task, save }: TaskEditProps) => {
    const [projectStorage] = useLocalStorageState(ProjectStorageKey, {
        defaultValue: defaultProjectData
    })
    const [text, setText] = useState(task.text || '')
    const [details, setDetails] = useState(task.details || '')

    return <div>
        <label>text:<input
            defaultValue={text}
            size={40}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
            autoFocus
        /></label>
        <br />
        <label>details:<input
            defaultValue={details}
            size={60}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setDetails(data)
            }}
        /></label>
        <br />
        <button onClick={() => {
            save({
                id: task.id,
                text: text,
                details: details,
                archived: task.archived,
                time: 0,
                tasks: [],
            })
        }} >Done</button>
    </div>
}

export default TaskEdit