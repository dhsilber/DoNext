import { useInsertionEffect, useReducer, useState } from 'react'
import { Task } from '../DoData'
import TaskListElement from './TaskListElement'
import { State, Action } from './Tasks'

interface TaskListProps {
    taskList: Task[]
    indentation: number
    save: (task: Task) => void
    setEditTask: (task: Task) => void
    keystrokeReducer: (state: State, action: Action) => State
}


const TaskList = ({ taskList, indentation, save, setEditTask, keystrokeReducer }: TaskListProps) => {
    const [cursor, dispatch] = useReducer(keystrokeReducer, {taskLine: 0})
    const [isShifted, setIsShifted] = useState(false)
    console.log('TaksList - indentation: ', indentation)

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
        const countOfTasks = taskList.length
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

    const handleIndentRight = () => {
        console.log('handleMoveUp - cursor.taskLine: ', cursor.taskLine)
        dispatch({
            type: 'indent-right'
        })
    }

    useInsertionEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if( event.altKey) {
                switch(event.key) {
                    case '∆': // alt-j
                        handleCursorDown()
                        break
                    case '˚': // alt-k
                        handleCursorUp()
                        break
                    case '¬': // alt-l
                        handleIndentRight()
                        break
                    case 'Ô': // alt-shift-J
                        handleMoveDown()
                        break
                    case '': // alt-shift-K
                        handleMoveUp()
                        break
                    default:
                        console.log('key: alt+', event.key, ' - ', event.keyCode)
                        break
                }
            // } else {
            //     switch(event.key) {
            //         case 'j':
            //             handleCursorDown()
            //             break
            //         case 'k':
            //             handleCursorUp()
            //             break
            //         case 'J':
            //             handleMoveDown()
            //             break
            //         case 'K':
            //             handleMoveUp()
            //             break
            //         default:
            //             console.log('key: ', event.key, ' - ', event.keyCode)
            //             break
            //     }
            }        
        }
    
        document.addEventListener("keydown", handleKeyDown)
    
        return function cleanup() {
          document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])


    console.log('TaskList - cursor.taskLine: ', cursor.taskLine)
    return <>
        {taskList
            .filter(task => task.archived === 0)
            .map((task, index) => {
                return <TaskListElement
                    key={'task' + task.id}
                    task={task}
                    currentTask = {index === cursor.taskLine}
                    indentation={indentation}
                    save={save}
                    setEditTask={setEditTask}
                    keystrokeReducer={keystrokeReducer}
                />
            })}
    </>
}

export default TaskList
