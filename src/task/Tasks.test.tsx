import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskStorageKey } from '../Constants'
import Tasks from "./Tasks"

test('has add button', () => {
    render(<Tasks />)

    const element = screen.getByRole('button', { name: '+' })
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {

    const user = userEvent.setup()
    render(<Tasks />)
    const element = screen.getByRole('button', { name: '+' })

    await user.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('plus button starts new edit dialog second time it is used', async () => {
    const user = userEvent.setup()
    render(<Tasks />)
    const plusButtonElement = screen.getByRole('button', { name: '+' })
    await user.click(plusButtonElement)
    expect(screen.queryByText('some task name')).not.toBeInTheDocument()
    expect(screen.queryByText('notes')).not.toBeInTheDocument()
    expect(screen.getByLabelText('text:')).toHaveDisplayValue('')
    expect(screen.getByLabelText('details:')).toHaveDisplayValue('')
    await user.type(screen.getByLabelText('text:'), 'some task name')
    await user.type(screen.getByLabelText('details:'), 'notes')
    await user.click(screen.getByRole('button', { name: 'Done' }))
    const element = screen.getByRole('button', { name: '+' })
    
    await user.click(element)
    
    expect(screen.getByText('some task name')).toBeInTheDocument()
    expect(screen.getByLabelText('text:')).toHaveDisplayValue('')
    expect(screen.getByLabelText('details:')).toHaveDisplayValue('')
    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', async () => {
    const user = userEvent.setup()
    render(<Tasks />)
    const element = screen.getByRole('button', { name: '+' })
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    await user.click(element)
    expect(await screen.findByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    await user.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})

test('after finishing intial edit, task shows in list', async () => {
    const user = userEvent.setup()
    // -----------------------
    localStorage.clear()
    // -----------------------
    render(<Tasks />)
    const element = screen.getByRole('button')
    await user.click(element)
    await user.type(screen.getByLabelText('text:'), 'task name')
    
    await user.click(screen.getByRole('button', { name: 'Done' }))
    
    expect(screen.queryByText('task name')).toBeInTheDocument()
    expect(screen.queryByText('text:')).not.toBeInTheDocument()
    expect(screen.queryByText('details:')).not.toBeInTheDocument()
})

test('clicking a checkbox archives task', async () => {
    const user = userEvent.setup()
    // -----------------------
    localStorage.clear()
    // -----------------------
    render(<Tasks />)
    const plusButtonElement = screen.getByRole('button', { name: '+' })
    await user.click(plusButtonElement)
    await user.type(screen.getByLabelText('text:'), 'some task name')
    await user.type(screen.getByLabelText('details:'), 'notes')
    await user.click(screen.getByRole('button', { name: 'Done' }))

    await user.click(screen.getByRole('checkbox', { name: 'some task name' }))

    expect(screen.queryByText('some task name')).not.toBeInTheDocument()
})

test('clicking a task\`s ampersand button edits that task', async () => {
    const user = userEvent.setup()
    // -----------------------
    localStorage.clear()
    // -----------------------
    render(<Tasks />)
    expect(screen.queryByText('some task name')).not.toBeInTheDocument()
    expect(screen.queryByText('notes')).not.toBeInTheDocument()
    const plusButtonElement = screen.getByRole('button', { name: '+' })
    await user.click(plusButtonElement)
    expect(screen.queryByText('some task name')).not.toBeInTheDocument()
    expect(screen.queryByText('notes')).not.toBeInTheDocument()
    expect(screen.getByLabelText('text:')).toHaveDisplayValue('')
    expect(screen.getByLabelText('details:')).toHaveDisplayValue('')
    await user.type(screen.getByLabelText('text:'), 'some task name')
    await user.type(screen.getByLabelText('details:'), 'notes')

    await user.click(screen.getByRole('button', { name: 'Done' }))
    
    expect(screen.getByText('some task name')).toBeInTheDocument()
    expect(screen.queryByText('notes')).not.toBeInTheDocument()
    
    await user.click(screen.getByRole('button', { name: '&' }))

    expect(screen.queryByText('some task name')).toBeInTheDocument()
    expect(screen.getByLabelText('text:')).toHaveDisplayValue('some task name')
    expect(screen.getByLabelText('details:')).toHaveDisplayValue('notes')
})
