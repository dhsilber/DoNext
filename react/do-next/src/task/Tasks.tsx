import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { TaskStorageKey } from '../Constants'
import { Task } from '../DoData'
import { defaultTaskData } from '../storage/Storage'
import TaskEdit from './TaskEdit'
import TaskList from './TaskList'
import { taskStore } from './TaskStore'


export type State = {
    taskLine: number
}

export type Action =
    | { type: 'down' }
    | { type: 'up' }
    | { type: 'move-down' }
    | { type: 'move-up' }
    | { type: 'indent-right' }


const emptyTask: Task = {
    id: 0,
    text: '',
    details: '',
    archived: 0,
    time: 0,
    tasks: [],
}

const Tasks = () => {
    const [taskStorage, setTaskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })
    const [edit, setEdit] = useState(false)
    const [editTask, setEditTask] = useState(emptyTask)


    const keystrokeReducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'down':
                if (state.taskLine < taskStorage.tasks.length - 1 ) {
                    return { taskLine: state.taskLine + 1 }
                } else {
                    return state
                }

            case 'up':
                if (state.taskLine > 0 ) {
                    return { taskLine: state.taskLine - 1 }
                } else {
                    return state
                }
                
            case 'move-down':
                console.log('move-down line: ', state.taskLine, taskStorage.tasks)
                if (state.taskLine < taskStorage.tasks.length - 1 ) {
                    swapTasks(state.taskLine)
                    return { taskLine: state.taskLine + 1 }
                } else {
                    console.log( 'move-down - no change')
                    return state
                }
                
            case 'move-up':
                console.log('move-up line: ', state.taskLine, taskStorage.tasks)
                if (state.taskLine > 0 ) {
                    swapTasks(state.taskLine - 1)
                    return { taskLine: state.taskLine - 1 }
                } else {
                    console.log( 'move-up - no change')
                    return state
                }

            case 'indent-right':
                console.log('indent-right: ', state.taskLine, taskStorage.tasks)
                if (state.taskLine > 0 ) {
                    const parentTask = taskStorage.tasks[state.taskLine - 1]
                    console.log('parent: ', parentTask.text)
                    const task = taskStorage.tasks.splice(state.taskLine, 1)[0]
                    console.log('task being moved: ', task.text)
                    parentTask.tasks.push(task)
                    setTaskStorage(taskStorage)
                }
                return state
                
            default:
                console.error('Unhandled action type.')
                return state                
        }
    }

    const save = (task: Task) => {
        setEdit(false)
        taskStore(task, taskStorage, setTaskStorage)
        setEditTask(emptyTask)
    }

    const setEditState = (task: Task) => {
        setEdit(true)
        setEditTask(task)
    }

    const swapTasks = (firstTask: number) => {
        console.log('swapTasks - firstTask: ', firstTask)
        let foo = taskStorage.tasks
        console.log('swapTasks - taskStorage.tasksJ: ', taskStorage.tasks)
        console.log('swapTasks - foo: ', foo)
        const holder = foo[firstTask]
        foo[firstTask] = foo[firstTask + 1]
        foo[firstTask + 1] = holder
        console.log('swapTasks - foo: ', foo)
        setTaskStorage({ tasks: foo, last_id: taskStorage.last_id })
    }

    return <div className='tasks'>
        <TaskList
            taskList={taskStorage.tasks}
            indentation={0}
            save={save}
            setEditTask={setEditState}
            keystrokeReducer={keystrokeReducer}
        />
        {edit && <TaskEdit task={editTask} save={save} />}
        <br />
        <button onClick={() => setEdit(true)} >+</button>
    </div>
}

export default Tasks