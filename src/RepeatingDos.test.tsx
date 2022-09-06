import { render, screen } from '@testing-library/react'
import { defaultData } from './App'
import { ToDoData } from './DoData'
import RepeatingDos, { checker } from './RepeatingDos'
import MockDate from 'mockdate'


afterEach(() => {
    MockDate.reset()
})

it('show repeating todos', () => {
    const dos = defaultData
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text

    render(<RepeatingDos data={dos.todos} store={jest.fn()} />)

    screen.getByText(first)
    screen.getByText(last)
})

it('checker', () => {
    MockDate.set(1234)
    const todo: ToDoData = { text: "test text", done: 0 }
    const todoList = [todo, { text: "hi", done: 0 }]
    const mockStore = jest.fn()
    const exptectedTodoList: ToDoData[] = [
        { text: "test text", done: 1234 },
        { text: "hi", done: 0 }
    ]

    checker(todo, todoList, mockStore)

    expect(mockStore).toHaveBeenCalled()
    expect(mockStore).toHaveBeenCalledWith(exptectedTodoList)
})
