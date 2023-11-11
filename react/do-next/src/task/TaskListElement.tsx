import { Task } from "../DoData"

interface TaskListElementProps {
    task: Task
    currentTask: boolean
    save: (task: Task) => void
    setEditTask: (task: Task) => void
}

const TaskListElement = ({ task, currentTask, save, setEditTask }: TaskListElementProps) => {
    const className = currentTask ? 'current-task' : ''
    return <div>
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
}

export default TaskListElement
