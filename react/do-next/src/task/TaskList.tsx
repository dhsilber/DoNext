import { useInsertionEffect, useReducer, useState } from 'react'
import { Task, TaskSet } from '../DoData'
import TaskListElement from './TaskListElement'
import { State, Action } from './Tasks'

interface TaskListProps {
    taskSet: TaskSet
    save: (task: Task) => void
    setEditTask: (task: Task) => void
    keystrokeReducer: (state: State, action: Action) => State
}


const TaskList = ({ taskSet, save, setEditTask, keystrokeReducer }: TaskListProps) => {
    const [cursor, dispatch] = useReducer(keystrokeReducer, {taskLine: 0})

    const handleCursorDown = () => {
        dispatch({
            type: 'down'
        })
    }

    const handleCursorUp = () => {
        dispatch({
            type: 'up'
        })
    }

    const handleMoveDown = () => {
        const countOfTasks = taskSet.tasks.length
        console.log('handleMoveDown - countOfTasks: ', countOfTasks)
        console.log('handleMoveDown - cursor.taskLine: ', cursor.taskLine)
        dispatch({
            type: 'move-down'
        })
    }

    const handleMoveUp = () => {
        console.log('handleMoveUp - cursor.taskLine: ', cursor.taskLine)
        dispatch({
            type: 'move-up'
        })
    }

    useInsertionEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          switch(event.key) {
            case 'j':
                handleCursorDown()
                break
            case 'k':
                handleCursorUp()
                break
            case 'J':
                handleMoveDown()
                break
            case 'K':
                handleMoveUp()
                break
          }

        }
    
        document.addEventListener("keydown", handleKeyDown)
    
        return function cleanup() {
          document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])


    console.log('TaskList - cursor.taskLine: ', cursor.taskLine)
    return <>
        {taskSet.tasks
            .filter(task => task.archived === 0)
            .map((task, index) => {
                return <TaskListElement
                    key={'task' + task.id}
                    task={task}
                    currentTask = {index === cursor.taskLine}
                    save={save}
                    setEditTask={setEditTask}
                />
            })}
    </>
}

export default TaskList
