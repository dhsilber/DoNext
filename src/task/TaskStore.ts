import { NO_ELEMENT_FOUND } from '../Constants';
import { Task, TaskSet } from '../DoData';

export const taskStore = (
    task: Task,
    allTasks: TaskSet,
    setStore: (data: TaskSet) => void
) => {
    if (task.text.length === 0) {
        return
    }

    if (task.id === 0) {
        task.id = allTasks.last_id + 1
        allTasks.tasks.push(task)
        allTasks.last_id += 1
    }
    else {
        const existingTaskIndex = allTasks.tasks
            .findIndex(item => item.id === task.id)
        if (existingTaskIndex === NO_ELEMENT_FOUND) {
            task.id = 0
            taskStore(task, allTasks, setStore)
            return
        }
        else {
            console.log(`Replacing task ${task.id} at index ${existingTaskIndex}`)
            allTasks.tasks.splice(existingTaskIndex, 1, task)
        }
    }

    setStore(allTasks)
}
