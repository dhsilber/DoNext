import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockDate from 'mockdate'
import Tracks from './Tracks'

test('has add button', () => {
    render(<Tracks />)

    const element = screen.getByRole('button')
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {
    render(<Tracks />)
    const element = screen.getByRole('button')

    userEvent.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', () => {
    render(<Tracks />)
    const element = screen.getByRole('button')
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    userEvent.click(element)
    expect(screen.queryByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    userEvent.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})

test('after finishing intial edit, track shows in list', () => {
    render(<Tracks />)
    const element = screen.getByRole('button')
    userEvent.click(element)
    userEvent.type(screen.getByLabelText('text:'), 'name')
    const doneButton = screen.getByRole('button', { name: 'Done' })

    userEvent.click(doneButton)

    expect(screen.queryByText('name')).toBeInTheDocument()
    expect(screen.queryByText('text:')).not.toBeInTheDocument()
})

test('clicking a checkbox adds current timestamp to track\'s list', () => {
    render(<Tracks />)
    const plusButtonElement = screen.getByRole('button')
    userEvent.click(plusButtonElement)
    userEvent.type(screen.getByLabelText('text:'), 'some track name')
    userEvent.click(screen.getByRole('button', { name: 'Done' }))
    MockDate.set(Date.parse('2022-01-02T13:24:00.000'))
    
    userEvent.click(screen.getByRole('checkbox', { name: 'some track name' }))

    expect(screen.getByText('some track name')).toBeInTheDocument()
    expect(screen.getByText('last tracked at:')).toBeInTheDocument()
    expect(screen.getByText('2022-01-02 13:24')).toBeInTheDocument()
})
