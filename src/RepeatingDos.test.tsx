import { render, screen } from '@testing-library/react'
import { defaultData } from './App'
import RepeatingDos from './RepeatingDos'
import MockDate from 'mockdate'

afterEach(() => {
    MockDate.reset()
})

it('show repeating todos', () => {
    const dos = JSON.parse(JSON.stringify( defaultData))
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text

    render(<RepeatingDos data={dos.todos} />)

    screen.getByText(first)
    screen.getByText(last)
})

it.each([
    [0],
    [Date.UTC(2000, 8, 9, 16)],
    [Date.UTC(2022, 8, 8, 0, 0, 1)],
    [Date.UTC(2022, 8, 8, 23, 59, 59)],
])('display name of todo when it has been checked at %p', (doneTime: number) => {
    MockDate.set(Date.UTC(2022, 8, 9, 0, 0, 1))
    const dos = JSON.parse(JSON.stringify( defaultData))
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text
    dos.todos[0].done = doneTime

    render(<RepeatingDos data={dos.todos} />)

    expect(screen.queryByText(last)).toBeInTheDocument()
    expect(screen.queryByText(first)).toBeInTheDocument()
})

it.each([
    [Date.UTC(2022, 8, 9, 0, 0, 1)],
    [Date.UTC(2022, 8, 9, 16)],
    [Date.UTC(2022, 8, 9, 23, 59, 59)],
    [Date.UTC(2100, 8, 8)],
])('does not display name of todo when it has been checked at %p', (doneTime: number) => {
    MockDate.set(Date.UTC(2022, 8, 9))
    const dos = JSON.parse(JSON.stringify( defaultData))
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text
    dos.todos[0].done = doneTime

    render(<RepeatingDos data={dos.todos} />)

    expect(screen.queryByText(last)).toBeInTheDocument()
    expect(screen.queryByText(first)).not.toBeInTheDocument()
})
