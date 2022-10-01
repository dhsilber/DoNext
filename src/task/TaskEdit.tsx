import React, { useState } from 'react'
import { Task } from '../DoData'

interface TaskEditProps {
    task: Task
    save: (track: Task) => void
}

const TaskEdit = ({ task, save }: TaskEditProps) => {
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
            save({ id: task.id, text: text, details: details, archived: task.archived, })
        }} >Done</button>
    </div>
}

export default TaskEdit