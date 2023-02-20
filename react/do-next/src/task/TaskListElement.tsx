import { Task } from "../DoData"

interface TaskListElementProps {
    task: Task
    save: (task: Task) => void
    setEditTask: (task: Task) => void
}

const TaskListElement = ({ task, save, setEditTask }: TaskListElementProps) => {
    return <div>
        <label>
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
