import { render, screen } from '@testing-library/react'
import MockDate from 'mockdate'
import userEvent from '@testing-library/user-event'
import Projects from './Projects'

test('has add button', () => {
    render(<Projects />)

    const element = screen.getByRole('button')
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {
    render(<Projects />)
    const element = screen.getByRole('button')

    userEvent.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', () => {
    render(<Projects />)
    const element = screen.getByRole('button')
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    userEvent.click(element)
    expect(screen.queryByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    userEvent.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})

test('after finishing intial edit, project shows in list', () => {
    render(<Projects />)
    const element = screen.getByRole('button')
    userEvent.click(element)
    userEvent.type(screen.getByLabelText('text:'), 'name')
    const doneButton = screen.getByRole('button', { name: 'Done' })

    userEvent.click(doneButton)

    expect(screen.queryByText('name')).toBeInTheDocument()
    expect(screen.queryByText('text:')).not.toBeInTheDocument()
})

test('clicking a checkbox adds 15 minutes to that project\'s tally', () => {
    MockDate.set(Date.UTC(2022, 8, 18, 5))
    render(<Projects />)
    const plusButtonElement = screen.getByRole('button')
    userEvent.click(plusButtonElement)
    userEvent.type(screen.getByLabelText('text:'), 'some project name')
    userEvent.click(screen.getByRole('button', { name: 'Done' }))
    MockDate.set(Date.UTC(2022, 8, 17, 5))
    userEvent.click(plusButtonElement)
    userEvent.type(screen.getByLabelText('text:'), 'other project')
    userEvent.click(screen.getByRole('button', { name: 'Done' }))

    userEvent.click(screen.getByRole('checkbox', { name: 'some project name' }))

    expect(screen.getByText('some project name')).toBeInTheDocument()
    expect(screen.getByText('15 minutes since 2022-09-18')).toBeInTheDocument()
    expect(screen.getByText('other project')).toBeInTheDocument()
    expect(screen.getByText('0 minutes since 2022-09-17')).toBeInTheDocument()
})
