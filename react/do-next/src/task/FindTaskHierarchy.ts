import { Task, TaskSet } from "../DoData"

let result: Task[] = []

const FindTask = (taskList: Task[], id: number): boolean => {
    console.log( 'taskList: ', taskList, '. id: ', id)
    for( let index = 0; index < taskList.length; index++) {
        const task = taskList[index]
        if (task.id === id) {
            result.push(task)
            console.log( 'Found task in taskList: ', taskList, '. id: ', id, '. result: ', result)
            return true
        }
        else {
            if (FindTask(task.tasks, id)) {
                result.push(task)
                console.log( 'Subsearch found task in taskList: ', taskList, '. id: ', id, '. result: ', result)
                return true
            }
        }
    }
    
    console.log( 'bailing out from taskList: ', taskList, '. id: ', id)
    return false
}

export default function FindTaskHierarchy(taskStructure: TaskSet, id: number): Task[]
{
    result = []
    console.log( 'taskStructure.taskRoot.tasks: ', taskStructure.taskRoot.tasks, '. id: ', id)
    if( FindTask(taskStructure.taskRoot.tasks, id) ) {
        result.push(taskStructure.taskRoot)
    }
    
    console.log( 'result: ', result)
    return result
}