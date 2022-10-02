import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MockDate from 'mockdate'
import { Task, TaskSet } from "../DoData"
import TaskList from "./TaskList"

test('shows list of tasks', () => {
    const taskSet: TaskSet = {
        tasks: [
            {
                id: 1, text: 'project name', details: 'notes', archived: 0,
                project: 0,
                time: 0,
            },
            {
                id: 2, text: 'other project', details: 'ideas', archived: 0,
                project: 0,
                time: 0,
            },
        ],
        last_id: 2,
    }
    render(<TaskList taskSet={taskSet} save={() => { }} setEditTask={() => { }} />)

    expect(screen.getByText('project name')).toBeInTheDocument()
    expect(screen.getByText('other project')).toBeInTheDocument()
})

test('does not show archived tasks', () => {
    MockDate.set(Date.parse('2022-01-02T13:24:00.000'))
    const currentTime = Date.now()
    const taskSet: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'project name',
                details: 'notes',
                archived: 0,
                project: 0,
                time: 0,
            },
            {
                id: 2,
                text: 'other project',
                details: 'ideas',
                archived: currentTime,
                project: 0,
                time: 0,
            },
        ],
        last_id: 2,
    }
    render(<TaskList taskSet={taskSet} save={() => { }} setEditTask={() => { }} />)

    expect(screen.getByText('project name')).toBeInTheDocument()
    expect(screen.queryByText('other project')).not.toBeInTheDocument()
})

test('each task has a checkbox', () => {
    const taskSet: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'project name',
                details: 'notes',
                archived: 0,
                project: 0,
                time: 0,
            },
            {
                id: 2,
                text: 'other project',
                details: 'ideas',
                archived: 0,
                project: 0,
                time: 0,
            },
        ],
        last_id: 2,
    }
    render(<TaskList taskSet={taskSet} save={() => { }} setEditTask={() => { }} />)

    expect(screen.getByRole('checkbox', { name: 'project name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'other project' })).toBeInTheDocument()
})

test('clicking a & button edits that track', async () => {
    const user = userEvent.setup()
    const mockSetEditTask = jest.fn((task: Task) => { })
    const taskSet: TaskSet = {
        tasks: [
            {
                id: 1,
                text: 'project name',
                details: 'notes',
                archived: 0,
                project: 0,
                time: 0,
            },
        ],
        last_id: 1,
    }
    render(<TaskList taskSet={taskSet} save={() => { }} setEditTask={mockSetEditTask} />)
    const ampersandButtonElement = screen.getByRole('button', { name: '&' })

    await user.click(ampersandButtonElement)

    expect(mockSetEditTask).toHaveBeenCalledTimes(1)
    expect(mockSetEditTask).toHaveBeenCalledWith(taskSet.tasks[0])
})
