import { Task, TaskSet } from "../DoData"
import { taskStore } from "./TaskStore"

const emptyTask: Task = {
    id: 0,
    text: '',
    details: '',
    archived: 0,
    time: 0,
    tasks: [],
}

const emptyTaskSet: TaskSet = {
    tasks: [],
    last_id: 0,
}

test('does not store if there is no text content', () => {
    const mockSetStore = jest.fn()

    taskStore(emptyTask, emptyTaskSet, mockSetStore)

    expect(mockSetStore).not.toHaveBeenCalled()
})

test('stores new content', () => {
    const mockSetStore = jest.fn()
    const newTask: Task = {
        id: 0,
        text: 'a',
        details: 'a stuff',
        archived: 0,
        time: 0,
        tasks: [],
    }
    const expected: TaskSet = {
        tasks: [{
            id: 1,
            text: 'a',
            details: 'a stuff',
            archived: 0,
            time: 0,
            tasks: [],
        }],
        last_id: 1,
    }

    taskStore(newTask, emptyTaskSet, mockSetStore)

    expect(mockSetStore).toHaveBeenCalledWith(expected)
})

test('updates existing content', () => {
    const someTime = Date.now()
    const task: Task = {
        id: 1,
        text: 'a redux',
        details: 'different stuff here',
        archived: someTime,
        time: 0,
        tasks: [],
    }
    const initial: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'a',
                details: 'a stuff',
                archived: 0,
                time: 0,
                tasks: [],
            }
        ],
        last_id: 1,
    }
    const expected: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'a redux',
                details: 'different stuff here',
                archived: someTime,
                time: 0,
                tasks: [],
            }
        ],
        last_id: 1,
    }
    const mockSetStore = jest.fn()

    taskStore(task, initial, mockSetStore)

    expect(mockSetStore).toHaveBeenCalledWith(expected)
})

test('will store multiple tasks with the same text', () => {
    const task: Task = {
        id: 0,
        text: 'a',
        details: 'different stuff here',
        archived: 0,
        time: 0,
        tasks: [],
    }
    const initial: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'a',
                details: 'a stuff',
                archived: 0,
                time: 0,
                tasks: [],
            }
        ],
        last_id: 1,
    }
    const expected: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'a',
                details: 'a stuff',
                archived: 0,
                time: 0,
                tasks: [],
            },
            {
                id: 2,
                text: 'a',
                details: 'different stuff here',
                archived: 0,
                time: 0,
                tasks: [],
            }
        ],
        last_id: 2,
    }
    const mockSetStore = jest.fn()

    taskStore(task, initial, mockSetStore)

    expect(mockSetStore).toHaveBeenCalledWith(expected)
})

test('if id does not match existing record store it', () => {
    const task: Task = {
        id: 7,
        text: 'a',
        details: 'different stuff here',
        archived: 0,
        time: 0,
        tasks: [],
    }
    const initial: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'a',
                details: 'a stuff',
                archived: 0,
                time: 0,
                tasks: [],
            }
        ],
        last_id: 1,
    }
    const expected: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'a',
                details: 'a stuff',
                archived: 0,
                time: 0,
                tasks: [],
            },
            {
                id: 2,
                text: 'a',
                details: 'different stuff here',
                archived: 0,
                time: 0,
                tasks: [],
            }
        ],
        last_id: 2,
    }
    const mockSetStore = jest.fn()

    taskStore(task, initial, mockSetStore)

    expect(mockSetStore).toHaveBeenCalledWith(expected)
})
