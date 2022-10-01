import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { TaskStorageKey } from '../Constants'
import { Task } from '../DoData'
import { defaultTaskData } from '../storage/Storage'
import TaskEdit from './TaskEdit'
import TaskList from './TaskList'
import { taskStore } from './TaskStore'

const emptyTask: Task = {
    id: 0,
    text: '',
    details: '',
    archived: 0,
}

const Tasks = () => {
    const [taskStorage, setTaskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })
    const [edit, setEdit] = useState(false)
    const [editTask, setEditTask] = useState(emptyTask)

    const save = (task: Task) => {
        setEdit(false)
        taskStore(task, taskStorage, setTaskStorage)
        setEditTask(emptyTask)
    }

    const setEditState = (task: Task) => {
        setEdit(true)
        setEditTask(task)
    }

    return <div className='tasks'>
        <TaskList taskSet={taskStorage} save={save} setEditTask={setEditState} />
        {edit && <TaskEdit task={editTask} save={save} />}
        <br />
        <button onClick={() => setEdit(true)} >+</button>
    </div>
}

export default Tasks