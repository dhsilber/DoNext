import MockDate from 'mockdate'
import checker from './Checker'
import { TodoSet, Todo } from '../DoData'

afterEach(() => {
    MockDate.reset()
})

it('checker', () => {
    MockDate.set(1234)
    const todo: Todo = { text: "test text", done: 0, days: [], persist: false }
    const todoList: Todo[] = [todo, { text: "hi", done: 0, days: [], persist: false }]
    const allData = { todos: todoList }
    const mockStore = jest.fn()
    const exptectedTodoData: TodoSet = {
        todos:
            [
                { text: "test text", done: 1234, days: [], persist: false },
                { text: "hi", done: 0, days: [], persist: false }
            ]
    }

    checker(todo, allData, mockStore)

    expect(mockStore).toHaveBeenCalled()
    expect(mockStore).toHaveBeenCalledWith(exptectedTodoData)
})
