import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Events from './Events'

test('has add button', () => {
    render(<Events />)

    const element = screen.getByRole('button')
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {
    render(<Events />)
    const element = screen.getByRole('button')

    userEvent.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', () => {
    render(<Events />)
    const element = screen.getByRole('button')
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    userEvent.click(element)
    expect(screen.queryByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    userEvent.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})
