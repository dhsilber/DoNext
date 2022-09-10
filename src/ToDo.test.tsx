import { fireEvent, render, screen } from "@testing-library/react"
import { ToDoData } from "./DoData"
import ToDo from "./ToDo"
import { defaultData } from "./App"
import checker from "./Checker"
jest.mock('./Checker')

it('displays name of todo', () => {
    const name = "Text of todo"
    const data: ToDoData = { text: name, done: 0 }

    render(<ToDo todo={data} />)

    expect(screen.getByText(name)).toBeInTheDocument()
})

it('displays checkbox', () => {
    const name = "Text of todo"
    const data: ToDoData = { text: name, done: 0 }

    render(<ToDo todo={data} />)

    screen.getByRole("checkbox")
})

it('checking box stores timestamp', () => {
    const mockChecker = jest.fn()
    const name = "Text of todo"
    const data: ToDoData = { text: name, done: 0 }

    render(<ToDo todo={data} />)

    const checkboxElement = screen.getByRole("checkbox")
    fireEvent.click(checkboxElement)
    expect(checker).toHaveBeenCalledTimes(1)
    expect(checker).toHaveBeenCalledWith(data, defaultData, expect.anything())
})
