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
    const [project, setProject] = useState(task.project || 0)

    return <div>
        <label>text:<input
            defaultValue={text}
            size={40}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
        /></label>
        <select
            value={project}
            onChange={(event) => {
                setProject(parseInt(event.target.value))
            }}
        >
            <option key={'project0'} value={0}>No project</option>
            {projectStorage.projects.map(project =>
                <option key={'project' + project.id} value={project.id}>
                    {project.text}
                </option>
            )}
        </select>
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
                project: project,
                time: 0,
            })
        }} >Done</button>
    </div>
}

export default TaskEdit