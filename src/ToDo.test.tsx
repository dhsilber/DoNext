import { fireEvent, render, screen } from "@testing-library/react"
import { ToDoData } from "./DoData"
import ToDo from "./ToDo"

const mockChecker = jest.fn()

it('displays name of todo', () => {
    const name = "Text of todo"
    const data: ToDoData = { text: name, done: 0  }

    render(<ToDo todo={data} checker={mockChecker} data={[data]} store={jest.fn()} />)

    screen.getByText(name)
})

it('displays checkbox', () => {
    const name = "Text of todo"
    const data: ToDoData = { text: name, done: 0  }

    render(<ToDo todo={data} checker={mockChecker} data={[data]} store={jest.fn()} />)

    screen.getByRole("checkbox")
})

it('checking box stores timestamp', () => {
    const mockChecker = jest.fn()
    const name = "Text of todo"
    const data: ToDoData = { text: name, done: 0 }

    render(<ToDo todo={data} checker={mockChecker} data={[data]} store={jest.fn()} />)

    const checkboxElement = screen.getByRole("checkbox")
    fireEvent.click(checkboxElement)
    expect(mockChecker).toHaveBeenCalledTimes(1)
    // expect(mockChecker).toHaveBeenNthCalledWith(1, expect.any({}), name)
})
