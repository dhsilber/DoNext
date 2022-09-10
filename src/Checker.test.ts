import MockDate from 'mockdate'
import checker from './Checker'
import { DoNextData, ToDoData } from './DoData'

afterEach(() => {
    MockDate.reset()
})

it('checker', () => {
    MockDate.set(1234)
    const todo: ToDoData = { text: "test text", done: 0 }
    const todoList = [todo, { text: "hi", done: 0 }]
    const allData = { todos: todoList }
    const mockStore = jest.fn()
    const exptectedTodoData: DoNextData = {
        todos:
            [
                { text: "test text", done: 1234 },
                { text: "hi", done: 0 }
            ]
    }

    checker(todo, allData, mockStore)

    expect(mockStore).toHaveBeenCalled()
    expect(mockStore).toHaveBeenCalledWith(exptectedTodoData)
})
