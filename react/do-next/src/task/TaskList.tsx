import React from 'react'
import { Task, TaskSet } from '../DoData'
import TaskListElement from './TaskListElement'

interface TaskListProps {
    taskSet: TaskSet
    save: (task: Task) => void
    setEditTask: (task: Task) => void
}

const TaskList = ({ taskSet, save, setEditTask }: TaskListProps) => {
    return <>
        {taskSet.tasks
            .filter(task => task.archived === 0)
            .map((task, index) => {
                return <TaskListElement
                    key={'task' + task.id}
                    task={task}
                    currentTask = {index == 0}
                    save={save}
                    setEditTask={setEditTask}
                />
            })}
    </>
}

export default TaskList