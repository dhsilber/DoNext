import { Task } from "../DoData"
import TaskList from "./TaskList"
import { State, Action } from './Tasks'

interface TaskListElementProps {
    task: Task
    currentTask: boolean
    indentation: number
    save: (task: Task) => void
    setEditTask: (task: Task) => void
    keystrokeReducer: (state: State, action: Action) => State
}

const TaskListElement = ({ task, currentTask, indentation, save, setEditTask, keystrokeReducer }: TaskListElementProps) => {
    console.log('TaskListElement - indentation: ', indentation)

    const className = currentTask ? 'current-task' : ''
    let indent = ''
    for( let spaces = 0; spaces < indentation; spaces++){
        indent += '-- '
        // indent += '&nbsp;'
    }
    console.log('indentation: ', indent)
    return <>
        <div>
            {indent}
            <label className={className}>
                <input
                    type='checkbox'
                    onClick={(event) => {
                        task.archived = Date.now()
                        save(task)
                    }}
                />
                {task.text + ' '}
            </label>
            <button onClick={() => { setEditTask(task) }} >&amp;</button>
        </div>
        <TaskList
            taskList={task.tasks}
            indentation={indentation + 1}
            save={save}
            setEditTask={setEditTask}
            keystrokeReducer={keystrokeReducer}
        />
    </>
}

export default TaskListElement
