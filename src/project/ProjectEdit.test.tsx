import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MockDate from 'mockdate'
import { Project } from "../DoData"
import ProjectEdit from "./ProjectEdit"

const emptyProject: Project = {
    text: "",
    beginning: 0,
    minutes: 0,
}

test('has form contents', () => {
    render(<ProjectEdit project={emptyProject} save={jest.fn()} />)

    screen.getByRole('textbox', { name: 'text:' })
    screen.getByRole('textbox', { name: 'beginning:' })
    screen.getByRole('button', { name: 'Done' })
})

test('done button sends current data to callback', () => {
    const mockSave = jest.fn()
    const expectedBeginning = Date.UTC(2022, 8, 9, 4, 8)
    MockDate.set(Date.UTC(2022, 8, 9, 4, 8, 1))
    const expected: Project = {
        text: 'name',
        beginning: expectedBeginning,
        minutes: 0,
    }
    render(<ProjectEdit project={emptyProject} save={mockSave} />)
    userEvent.type(screen.getByLabelText('text:'), 'name')
    const element = screen.getByRole("button")

    fireEvent.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('initial data is default', () => {
    const mockSave = jest.fn()
    const expectedBeginning = Date.UTC(2021, 8, 9, 4, 8)
    const expected: Project = {
        text: 'name',
        beginning: expectedBeginning,
        minutes: 0,
    }

    render(<ProjectEdit project={expected} save={mockSave} />)

    expect(screen.getByLabelText('text:')).toHaveDisplayValue('name')
    expect(screen.getByLabelText('beginning:')).toHaveDisplayValue('2021-09-09T04:08:00.000Z')
    const element = screen.getByRole("button")
    fireEvent.click(element)
    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})
