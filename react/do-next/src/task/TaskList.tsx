import { useInsertionEffect, useReducer } from 'react'
import { Task, TaskSet } from '../DoData'
import TaskListElement from './TaskListElement'

interface TaskListProps {
    taskSet: TaskSet
    save: (task: Task) => void
    setEditTask: (task: Task) => void
}

type State = {
    taskLine: number
}

type Action =
| { type: 'down' }
| { type: 'up' }

const TaskList = ({ taskSet, save, setEditTask }: TaskListProps) => {
    const [cursor, dispatch] = useReducer(keystrokeReducer, {taskLine: 0});

    function keystrokeReducer(state: State, action: Action): State {
        switch (action.type) {
            case 'down':
                return { taskLine: state.taskLine + 1 }
            case 'up':
                return { taskLine: state.taskLine - 1 }
        }
    }

    function handleMoveDown() {
        dispatch({
            type: 'down'
        })
    }

    function handleMoveUp() {
        dispatch({
            type: 'up'
        })
    }

    useInsertionEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          switch(event.key) {
              case 'j':
                handleMoveDown()
                break
            case 'k':
                handleMoveUp()
                break
           }
 
        }
    
        document.addEventListener("keydown", handleKeyDown)
    
        return function cleanup() {
          document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return <>
        {taskSet.tasks
            .filter(task => task.archived === 0)
            .map((task, index) => {
                return <TaskListElement
                    key={'task' + task.id}
                    task={task}
                    currentTask = {index == cursor.taskLine}
                    save={save}
                    setEditTask={setEditTask}
                />
            })}
    </>
}

export default TaskList
