import { fireEvent, render, screen } from "@testing-library/react"
import { Todo } from "../DoData"
import ToDo from "./ToDo"
import checker from "./Checker"
import { defaultToDoData } from "../storage/Storage"
jest.mock('./Checker')

it('displays name of todo', () => {
    const name = "Text of todo"
    const data: Todo = { text: name, done: 0, days: [], persist: false }

    render(<ToDo todo={data} />)

    expect(screen.getByText(name)).toBeInTheDocument()
})

it('displays checkbox', () => {
    const name = "Text of todo"
    const data: Todo = { text: name, done: 0, days: [], persist: false }

    render(<ToDo todo={data} />)

    screen.getByRole("checkbox")
})

it('checking box stores timestamp', () => {
    const mockChecker = jest.fn()
    const name = "Text of todo"
    const data: Todo = { text: name, done: 0, days: [], persist: false }

    render(<ToDo todo={data} />)

    const checkboxElement = screen.getByRole("checkbox")
    fireEvent.click(checkboxElement)
    expect(checker).toHaveBeenCalledTimes(1)
    expect(checker).toHaveBeenCalledWith(data, defaultToDoData, expect.anything())
})
