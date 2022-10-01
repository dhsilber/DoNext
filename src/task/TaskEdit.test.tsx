import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Task } from "../DoData"
import TaskEdit from "./TaskEdit"

const emptyTask: Task = {
    id: 0,
    text: '',
    details: '',
    archived: 0,
}

test('has form contents for initial entry', () => {
    render(<TaskEdit task={emptyTask} save={() => { }} />)

    screen.getByRole('textbox', { name: 'text:' })
    screen.getByRole('textbox', { name: 'details:' })
    screen.getByRole('button', { name: 'Done' })
})

test('has form contents upon later edit', () => {
    const taskWithData: Task = {
        id: 0,
        text: 'track name',
        details: 'detailed notes',
        archived: 0,
    }
    
    render(<TaskEdit task={taskWithData} save={() => { }} />)
    
    screen.getByRole('textbox', { name: 'text:' })
    expect(screen.getByRole('textbox', { name: 'text:' })).toHaveValue('track name')
    screen.getByRole('textbox', { name: 'details:' })
    expect(screen.getByRole('textbox', { name: 'details:' })).toHaveValue('detailed notes')
    screen.getByRole('button', { name: 'Done' })
})

test('done button sends initial data to callback', async () => {
    const user =userEvent.setup()
    const mockSave = jest.fn()
    const expected: Task = {
        id: 0,
        text: 'name',
        details: 'notes',
        archived: 0,
    }
    render(<TaskEdit task={emptyTask} save={mockSave} />)

    await user.click(screen.getByRole("button"))

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(emptyTask)
})

test('done button sends changed data to callback', async () => {
    const user =userEvent.setup()
    const mockSave = jest.fn()
    const expected: Task = {
        id: 0,
        text: 'name',
        details: 'notes',
        archived: 0,
    }
    render(<TaskEdit task={emptyTask} save={mockSave} />)
    await user.type(screen.getByLabelText('text:'), 'name')
    await user.type(screen.getByLabelText('details:'), 'notes')

    await user.click(screen.getByRole("button"))

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('initial data is default', async () => {
    const user =userEvent.setup()
    const mockSave = jest.fn()
    const expected: Task = {
        id: 0,
        text: 'task',
        details: 'ideas',
        archived: 0,
    }
    render(<TaskEdit task={expected} save={mockSave} />)

    expect(screen.getByLabelText('text:')).toHaveDisplayValue('task')
    expect(screen.getByLabelText('details:')).toHaveDisplayValue('ideas')

    await user.click(screen.getByRole("button"))

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('changed data is saved', async () => {
    const user =userEvent.setup()
    const mockSave = jest.fn()
    const initial: Task = {
        id: 0,
        text: 'task',
        details: 'ideas',
        archived: 0,
    }
    const expected: Task = {
    id: 0,
        text: 'different task',
        details: 'thoughts',
        archived: 0,
    }
    render(<TaskEdit task={initial} save={mockSave} />)
    const textField = screen.getByLabelText('text:')
    await user.clear(textField)
    await user.type(textField, 'different task')
    const detailsField=screen.getByLabelText('details:')
    await user.clear(detailsField)
    await user.type(detailsField, 'thoughts')

    await user.click(screen.getByRole("button"))

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})
